import React, { useRef } from 'react';
import { PROJECTS } from '../constants';
import SectionHeading from './SectionHeading';
import Container from './ui/Container';
import { MOTION_OK, SCRUB, ScrollTrigger, gsap, useScrollMotion, viewportWindow } from './motion/scroll';

/*
 * The project wall, between the hero and the case studies: every live site's home page as a tile,
 * flying in from deep in the scene and joining the others in one tilted wall as the page scrolls.
 * On wide screens the wall holds still while the last tiles arrive. Each tile opens its live site.
 * With reduced motion the wall is simply there.
 */

const TILES = PROJECTS.map((project) => ({
    id: project.id,
    name: project.name,
    href: project.liveLink,
    image: `${project.screenshots[0].src}-720.webp`,
}));

// Tiles per row: four, five and four from tablets up; two, three, three, three and two on phones.
// A list of another length falls back to even rows.
const WIDE_ROWS = [4, 5, 4];
const NARROW_ROWS = [2, 3, 3, 3, 2];

const rowsFor = (pattern, perRow) => {
    if (pattern.reduce((sum, count) => sum + count, 0) === TILES.length) return pattern;
    return Array.from({ length: Math.ceil(TILES.length / perRow) }, (_, row) => Math.min(perRow, TILES.length - row * perRow));
};

// Where a tile sits, in tile steps from the middle of the wall.
const placeIn = (rows, index) => {
    let first = 0;
    for (let row = 0; row < rows.length; row += 1) {
        if (index < first + rows[row]) return { col: index - first - (rows[row] - 1) / 2, row: row - (rows.length - 1) / 2 };
        first += rows[row];
    }
    return { col: 0, row: 0 };
};

const wide = rowsFor(WIDE_ROWS, 5);
const narrow = rowsFor(NARROW_ROWS, 3);

// A fixed scatter for each tile (0..1), so the wall comes together the same way on every visit.
const noise = (index, salt) => {
    const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
    return value - Math.floor(value);
};

const useWallJoin = (sectionRef) =>
    useScrollMotion(
        sectionRef,
        ({ hold }) => {
            const q = gsap.utils.selector(sectionRef.current);
            const stage = q('[data-wall-stage]')[0];

            // On wide screens the wall is pinned while it finishes joining; elsewhere it joins as it
            // scrolls up the screen.
            let range = { ...viewportWindow(stage, 1, 0.3) };
            if (hold) {
                const pin = ScrollTrigger.create({ trigger: stage, start: 'center center', end: '+=70%', pin: true });
                range = { trigger: stage, start: 'top 90%', end: () => pin.end, invalidateOnRefresh: true };
            }

            const timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { ...range, scrub: SCRUB } });
            q('[data-tile]').forEach((tile, index) => {
                timeline.fromTo(
                    tile,
                    {
                        x: () => (noise(index, 1) - 0.5) * stage.clientWidth * 1.4,
                        y: () => (noise(index, 2) - 0.5) * stage.clientHeight * 1.8,
                        z: () => -900 - noise(index, 3) * 2400,
                        rotationX: (noise(index, 4) - 0.5) * 120,
                        rotationY: (noise(index, 5) - 0.5) * 140,
                        rotationZ: (noise(index, 6) - 0.5) * 80,
                        opacity: 0,
                    },
                    { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, opacity: 1, duration: 0.55 },
                    noise(index, 7) * 0.45
                );
            });
            // Meanwhile the wall turns from a steep angle towards the viewer.
            timeline.fromTo(
                q('[data-wall-plane]'),
                { '--wall-rx': '28deg', '--wall-ry': '-24deg', '--wall-rz': '7deg' },
                { '--wall-rx': '12deg', '--wall-ry': '-8deg', '--wall-rz': '1.5deg', duration: 1, ease: 'none' },
                0
            );
        },
        { motion: MOTION_OK, hold: '(min-width: 1024px)' }
    );

const ProjectWall = () => {
    const sectionRef = useRef(null);
    useWallJoin(sectionRef);

    return (
        <section ref={sectionRef} id="work" aria-labelledby="work-title" className="screen relative py-16 sm:py-20 lg:py-24">
            {/* A plain block between the full-screen flex section and the stage: the pin's spacer
                does not make room for the pinned scroll when its parent is a flex container. */}
            <div>
                <Container>
                    <SectionHeading
                        id="work-title"
                        title={`${TILES.length} live sites`}
                        lead="Storefronts, company sites, dashboards and web apps, each one online. Open any of them, or scroll on for the featured case studies."
                    />
                </Container>

                <div data-wall-stage className="wall-stage">
                    <ul data-wall-plane className="wall-plane">
                        {TILES.map((tile, index) => {
                            const big = placeIn(wide, index);
                            const small = placeIn(narrow, index);
                            return (
                                <li
                                    key={tile.id}
                                    data-tile
                                    className="wall-tile"
                                    style={{ '--wc': big.col, '--wr': big.row, '--nc': small.col, '--nr': small.row }}
                                >
                                    <a href={tile.href} target="_blank" rel="noopener noreferrer" className="wall-card" aria-label={`${tile.name}: open the live site (opens in a new tab)`}>
                                        <span className="wall-bar" aria-hidden="true">
                                            <i />
                                            <i />
                                            <i />
                                        </span>
                                        <img src={tile.image} alt="" width="720" height="450" loading="lazy" decoding="async" />
                                        <span className="wall-label" aria-hidden="true">
                                            {tile.name}
                                        </span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProjectWall;
