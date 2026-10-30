import React, { useEffect, useRef } from 'react';

/*
 * Ink in water across the whole page: a WebGL fluid simulation (the classic GPU "stable fluids"
 * method: advection, vorticity, pressure projection) that the pointer stirs. Each movement pushes
 * the fluid and drops dye in a slowly cycling colour; the dye swirls, spreads and fades, and a
 * light shading pass gives it a glossy, inky surface. The settings follow the effect on
 * aaabadcode.com, with the colours drawn from this site's cyan and electric blue.
 *
 * It is one fixed layer over the page (App.jsx), stirred by a mouse or pen anywhere and by a
 * finger on the first screen only (elsewhere a finger is scrolling). It sleeps once the pointer
 * has been still long enough for the ink to fade, and while the tab is hidden; it does not run at
 * all with reduced motion or without WebGL half-float support.
 */

const CONFIG = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 0.5,
    VELOCITY_DISSIPATION: 3,
    PRESSURE: 0.1,
    PRESSURE_ITERATIONS: 20,
    CURL: 3,
    SPLAT_RADIUS: 0.2,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLOR_UPDATE_SPEED: 10,
};

// With the pointer still this long, the ink has faded away and the simulation sleeps.
const IDLE_MS = 10000;

// Hues sampled for the dye (0..1 around the colour wheel): cyan through sky to electric blue.
const HUE_FROM = 0.5;
const HUE_SPAN = 0.17;

const BASE_VERTEX = `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

const CLEAR = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`;

const SPLAT = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`;

// Moves a quantity along the velocity field, fading it as it goes. Without linear filtering of
// half floats, the bilinear lookup is done by hand.
const ADVECTION = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }
`;

const DIVERGENCE = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`;

const CURL = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`;

// Feeds the swirl back into the velocity, which keeps the little eddies alive.
const VORTICITY = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`;

const PRESSURE = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`;

const GRADIENT_SUBTRACT = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`;

// Draws the dye, lit from the front by its own slope, as premultiplied colour over the page.
const DISPLAY = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform vec2 texelSize;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;
        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        float diffuse = clamp(dot(n, vec3(0.0, 0.0, 1.0)) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`;

const hsvToRgb = (h, s, v) => {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    return [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q],
    ][i % 6];
};

// WebGL with half-float render targets, or null where the device cannot run the simulation.
const getContext = (canvas) => {
    const options = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    let gl = canvas.getContext('webgl2', options);
    const isWebGL2 = Boolean(gl);
    if (!gl) gl = canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options);
    if (!gl) return null;

    let halfFloatType;
    let linear;
    if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        linear = gl.getExtension('OES_texture_float_linear');
        halfFloatType = gl.HALF_FLOAT;
    } else {
        const halfFloat = gl.getExtension('OES_texture_half_float');
        linear = gl.getExtension('OES_texture_half_float_linear');
        halfFloatType = halfFloat && halfFloat.HALF_FLOAT_OES;
    }
    if (!halfFloatType) return null;

    const renders = (internalFormat, format) => {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, halfFloatType, null);
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        gl.deleteFramebuffer(fbo);
        gl.deleteTexture(texture);
        return ok;
    };
    // The smallest format each target can render to, falling back to wider ones.
    const pick = (candidates) => candidates.find(([internalFormat, format]) => renders(internalFormat, format));
    const formats = isWebGL2
        ? {
              rgba: pick([[gl.RGBA16F, gl.RGBA]]),
              rg: pick([[gl.RG16F, gl.RG], [gl.RGBA16F, gl.RGBA]]),
              r: pick([[gl.R16F, gl.RED], [gl.RG16F, gl.RG], [gl.RGBA16F, gl.RGBA]]),
          }
        : { rgba: pick([[gl.RGBA, gl.RGBA]]), rg: pick([[gl.RGBA, gl.RGBA]]), r: pick([[gl.RGBA, gl.RGBA]]) };
    if (!formats.rgba || !formats.rg || !formats.r) return null;

    return { gl, halfFloatType, linear: Boolean(linear), formats };
};

const FluidLayer = ({ className = '' }) => {
    const holderRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
        const holder = holderRef.current;
        // A new canvas for every run, put on the page only once the simulation is ready: a canvas
        // keeps its WebGL context for life, and one whose context is lost paints solid white on
        // some GPUs. (React's development mode runs this effect twice, losing the first context.)
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'display:block;width:100%;height:100%';
        const context = getContext(canvas);
        if (!context) return undefined;
        const { gl, halfFloatType, linear, formats } = context;
        const release = () => gl.getExtension('WEBGL_lose_context')?.loseContext();
        const small = window.matchMedia('(max-width: 767px)').matches;
        const config = {
            ...CONFIG,
            DYE_RESOLUTION: linear ? (small ? 512 : CONFIG.DYE_RESOLUTION) : 256,
            SHADING: linear && CONFIG.SHADING,
        };

        const compile = (type, source, keywords = []) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, keywords.map((keyword) => `#define ${keyword}\n`).join('') + source);
            gl.compileShader(shader);
            return shader;
        };
        const vertex = compile(gl.VERTEX_SHADER, BASE_VERTEX);
        const program = (source, keywords) => {
            const id = gl.createProgram();
            gl.attachShader(id, vertex);
            gl.attachShader(id, compile(gl.FRAGMENT_SHADER, source, keywords));
            gl.bindAttribLocation(id, 0, 'aPosition');
            gl.linkProgram(id);
            const uniforms = {};
            const count = gl.getProgramParameter(id, gl.ACTIVE_UNIFORMS);
            for (let index = 0; index < count; index += 1) {
                const name = gl.getActiveUniform(id, index).name;
                uniforms[name] = gl.getUniformLocation(id, name);
            }
            return { id, uniforms, ok: gl.getProgramParameter(id, gl.LINK_STATUS), bind: () => gl.useProgram(id) };
        };
        const programs = {
            clear: program(CLEAR),
            splat: program(SPLAT),
            advection: program(ADVECTION, linear ? [] : ['MANUAL_FILTERING']),
            divergence: program(DIVERGENCE),
            curl: program(CURL),
            vorticity: program(VORTICITY),
            pressure: program(PRESSURE),
            gradient: program(GRADIENT_SUBTRACT),
            display: program(DISPLAY, config.SHADING ? ['SHADING'] : []),
        };
        if (Object.values(programs).some((item) => !item.ok)) {
            release();
            return undefined;
        }

        // One full-screen quad, drawn into a target (or onto the canvas).
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        const blit = (target) => {
            if (target) {
                gl.viewport(0, 0, target.width, target.height);
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            } else {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        };

        const createTarget = (width, height, [internalFormat, format], filter) => {
            gl.activeTexture(gl.TEXTURE0);
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, halfFloatType, null);
            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            gl.viewport(0, 0, width, height);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            return {
                texture,
                fbo,
                width,
                height,
                texelX: 1 / width,
                texelY: 1 / height,
                attach: (unit) => {
                    gl.activeTexture(gl.TEXTURE0 + unit);
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    return unit;
                },
                dispose: () => {
                    gl.deleteFramebuffer(fbo);
                    gl.deleteTexture(texture);
                },
            };
        };
        // A pair of targets read from and written to in turn.
        const createPair = (...args) => {
            const pair = { read: createTarget(...args), write: createTarget(...args) };
            return {
                get width() {
                    return pair.read.width;
                },
                get height() {
                    return pair.read.height;
                },
                get texelX() {
                    return pair.read.texelX;
                },
                get texelY() {
                    return pair.read.texelY;
                },
                get readTarget() {
                    return pair.read;
                },
                get writeTarget() {
                    return pair.write;
                },
                swap: () => {
                    [pair.read, pair.write] = [pair.write, pair.read];
                },
                dispose: () => {
                    pair.read.dispose();
                    pair.write.dispose();
                },
            };
        };

        const resolution = (base) => {
            const aspect = Math.max(gl.drawingBufferWidth / gl.drawingBufferHeight, gl.drawingBufferHeight / gl.drawingBufferWidth);
            const min = Math.round(base);
            const max = Math.round(base * aspect);
            return gl.drawingBufferWidth > gl.drawingBufferHeight ? [max, min] : [min, max];
        };

        let targets = null;
        const buildTargets = () => {
            if (targets) Object.values(targets).forEach((target) => target.dispose());
            const [simW, simH] = resolution(config.SIM_RESOLUTION);
            const [dyeW, dyeH] = resolution(config.DYE_RESOLUTION);
            const filter = linear ? gl.LINEAR : gl.NEAREST;
            gl.disable(gl.BLEND);
            targets = {
                dye: createPair(dyeW, dyeH, formats.rgba, filter),
                velocity: createPair(simW, simH, formats.rg, filter),
                divergence: createTarget(simW, simH, formats.r, gl.NEAREST),
                curl: createTarget(simW, simH, formats.r, gl.NEAREST),
                pressure: createPair(simW, simH, formats.r, gl.NEAREST),
            };
        };

        const resize = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5);
            const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
            const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
            if (canvas.width === width && canvas.height === height && targets) return;
            canvas.width = width;
            canvas.height = height;
            buildTargets();
        };
        holder.appendChild(canvas);
        resize();

        const pass = (item, setup, target) => {
            item.bind();
            setup(item.uniforms);
            blit(target);
        };

        const splat = (x, y, dx, dy, color) => {
            const { velocity, dye } = targets;
            gl.disable(gl.BLEND);
            const aspect = canvas.width / canvas.height;
            const radius = (config.SPLAT_RADIUS / 100) * (aspect > 1 ? aspect : 1);
            const draw = (pair, value) =>
                pass(
                    programs.splat,
                    (u) => {
                        gl.uniform1i(u.uTarget, pair.readTarget.attach(0));
                        gl.uniform1f(u.aspectRatio, aspect);
                        gl.uniform2f(u.point, x, y);
                        gl.uniform3f(u.color, ...value);
                        gl.uniform1f(u.radius, radius);
                    },
                    pair.writeTarget
                );
            draw(velocity, [dx, dy, 0]);
            velocity.swap();
            draw(dye, color);
            dye.swap();
            canvas.dataset.splats = String(Number(canvas.dataset.splats || 0) + 1);
        };

        const step = (dt) => {
            const { velocity, dye, divergence, curl, pressure } = targets;
            gl.disable(gl.BLEND);
            const texel = (u) => gl.uniform2f(u.texelSize, velocity.texelX, velocity.texelY);

            pass(programs.curl, (u) => {
                texel(u);
                gl.uniform1i(u.uVelocity, velocity.readTarget.attach(0));
            }, curl);
            pass(programs.vorticity, (u) => {
                texel(u);
                gl.uniform1i(u.uVelocity, velocity.readTarget.attach(0));
                gl.uniform1i(u.uCurl, curl.attach(1));
                gl.uniform1f(u.curl, config.CURL);
                gl.uniform1f(u.dt, dt);
            }, velocity.writeTarget);
            velocity.swap();
            pass(programs.divergence, (u) => {
                texel(u);
                gl.uniform1i(u.uVelocity, velocity.readTarget.attach(0));
            }, divergence);
            pass(programs.clear, (u) => {
                gl.uniform1i(u.uTexture, pressure.readTarget.attach(0));
                gl.uniform1f(u.value, config.PRESSURE);
            }, pressure.writeTarget);
            pressure.swap();
            programs.pressure.bind();
            texel(programs.pressure.uniforms);
            gl.uniform1i(programs.pressure.uniforms.uDivergence, divergence.attach(0));
            for (let index = 0; index < config.PRESSURE_ITERATIONS; index += 1) {
                gl.uniform1i(programs.pressure.uniforms.uPressure, pressure.readTarget.attach(1));
                blit(pressure.writeTarget);
                pressure.swap();
            }
            pass(programs.gradient, (u) => {
                texel(u);
                gl.uniform1i(u.uPressure, pressure.readTarget.attach(0));
                gl.uniform1i(u.uVelocity, velocity.readTarget.attach(1));
            }, velocity.writeTarget);
            velocity.swap();
            pass(programs.advection, (u) => {
                texel(u);
                if (!linear) gl.uniform2f(u.dyeTexelSize, velocity.texelX, velocity.texelY);
                const source = velocity.readTarget.attach(0);
                gl.uniform1i(u.uVelocity, source);
                gl.uniform1i(u.uSource, source);
                gl.uniform1f(u.dt, dt);
                gl.uniform1f(u.dissipation, config.VELOCITY_DISSIPATION);
            }, velocity.writeTarget);
            velocity.swap();
            pass(programs.advection, (u) => {
                texel(u);
                if (!linear) gl.uniform2f(u.dyeTexelSize, dye.texelX, dye.texelY);
                gl.uniform1i(u.uVelocity, velocity.readTarget.attach(0));
                gl.uniform1i(u.uSource, dye.readTarget.attach(1));
                gl.uniform1f(u.dissipation, config.DENSITY_DISSIPATION);
            }, dye.writeTarget);
            dye.swap();
        };

        const render = () => {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
            pass(programs.display, (u) => {
                if (config.SHADING) gl.uniform2f(u.texelSize, 1 / gl.drawingBufferWidth, 1 / gl.drawingBufferHeight);
                gl.uniform1i(u.uTexture, targets.dye.readTarget.attach(0));
            }, null);
        };

        // Dye: a hue from the palette's stretch of the wheel, a little stronger on midnight.
        const nextColor = () => {
            const intensity = document.documentElement.classList.contains('dark') ? 0.1 : 0.075;
            return hsvToRgb(HUE_FROM + Math.random() * HUE_SPAN, 1, 1).map((channel) => channel * intensity);
        };

        const pointer = { x: 0, y: 0, dx: 0, dy: 0, clientX: -1, clientY: -1, moved: false, started: false, color: nextColor() };
        let lastInput = performance.now();

        // The layer blends with what is under it, so text under a swirl keeps its contrast: screened
        // on midnight (it glows, and light text stays light), multiplied on light paper (it tints,
        // and dark text stays dark). It takes the blend of the surface under the pointer, where the
        // ink is: the midnight bands are dark in the light theme too.
        let blend = '';
        const updateBlend = () => {
            const under = pointer.clientX < 0 ? null : document.elementFromPoint(pointer.clientX, pointer.clientY);
            const next = document.documentElement.classList.contains('dark') || under?.closest('.night') ? 'screen' : 'multiply';
            if (next === blend) return;
            blend = next;
            canvas.style.mixBlendMode = next;
        };
        updateBlend();

        const track = (clientX, clientY) => {
            pointer.clientX = clientX;
            pointer.clientY = clientY;
            lastInput = performance.now();
            start();
            const rect = canvas.getBoundingClientRect();
            const x = (clientX - rect.left) / rect.width;
            const y = 1 - (clientY - rect.top) / rect.height;
            const aspect = rect.width / rect.height;
            if (!pointer.started) {
                pointer.started = true;
                pointer.x = x;
                pointer.y = y;
                return;
            }
            pointer.dx = (x - pointer.x) * (aspect < 1 ? aspect : 1);
            pointer.dy = (y - pointer.y) / (aspect > 1 ? aspect : 1);
            pointer.x = x;
            pointer.y = y;
            pointer.moved = pointer.moved || Math.abs(pointer.dx) > 0 || Math.abs(pointer.dy) > 0;
        };
        const onPointerMove = (event) => {
            if (event.pointerType !== 'touch') track(event.clientX, event.clientY);
        };
        const onTouchMove = (event) => {
            const touch = event.touches[0];
            if (touch && event.target instanceof Element && event.target.closest('#home')) track(touch.clientX, touch.clientY);
        };
        const onLeave = () => {
            pointer.started = false;
        };
        // The pointer leaving the window.
        const onPointerOut = (event) => {
            if (!event.relatedTarget) onLeave();
        };
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerout', onPointerOut);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchend', onLeave);

        // A few soft swirls to start with, so the surface is alive before anyone moves.
        for (let index = 0; index < 3; index += 1) {
            const color = nextColor().map((channel) => channel * 1.6);
            splat(0.45 + Math.random() * 0.45, 0.25 + Math.random() * 0.5, 700 * (Math.random() - 0.5), 700 * (Math.random() - 0.5), color);
        }

        let frame = 0;
        let frames = 0;
        let last = performance.now();
        let colorTimer = 0;
        let lost = false;
        const loop = () => {
            const now = performance.now();
            frames += 1;
            // The page scrolls and the theme changes under a still pointer, so check every few frames.
            if (frames % 12 === 0) updateBlend();
            const dt = Math.min((now - last) / 1000, 1 / 60);
            last = now;
            colorTimer += dt * config.COLOR_UPDATE_SPEED;
            if (colorTimer >= 1) {
                colorTimer %= 1;
                pointer.color = nextColor();
            }
            if (pointer.moved) {
                pointer.moved = false;
                splat(pointer.x, pointer.y, pointer.dx * config.SPLAT_FORCE, pointer.dy * config.SPLAT_FORCE, pointer.color);
            }
            step(dt);
            render();
            frame = now - lastInput > IDLE_MS ? 0 : window.requestAnimationFrame(loop);
        };
        const start = () => {
            if (frame || lost || document.hidden) return;
            last = performance.now();
            frame = window.requestAnimationFrame(loop);
        };
        const stop = () => {
            window.cancelAnimationFrame(frame);
            frame = 0;
        };
        start();

        const sizeObserver = new ResizeObserver(resize);
        sizeObserver.observe(canvas);
        const onVisibility = () => (document.hidden ? stop() : start());
        document.addEventListener('visibilitychange', onVisibility);
        // If the GPU drops the context (a driver reset, too many contexts), the fluid simply goes.
        const onLost = () => {
            lost = true;
            stop();
            canvas.remove();
        };
        canvas.addEventListener('webglcontextlost', onLost);
        canvas.dataset.fluid = 'running';

        return () => {
            stop();
            sizeObserver.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerout', onPointerOut);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onLeave);
            canvas.removeEventListener('webglcontextlost', onLost);
            canvas.remove();
            release();
        };
    }, []);

    return <div ref={holderRef} className={`pointer-events-none ${className}`} aria-hidden="true" />;
};

export default FluidLayer;
