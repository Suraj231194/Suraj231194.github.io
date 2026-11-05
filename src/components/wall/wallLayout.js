/*
 * Where each live site sits on the project stage (ProjectWall.jsx). The stage is an amphitheatre
 * of screens around a lit floor: the newest site as the hero screen at the top, a pair in the
 * upper arc, a pair at mid height, a pair at the front, and a far row of small screens across the
 * middle. Every screen turns toward the centre.
 *
 * Wide screens: a 1600 x 900 frame. Each slot gives the card's top-left corner and width in frame
 * pixels (its height follows from the card's shape), its depth (0 = nearest, 1 = farthest) and its
 * turn in degrees. Depth sets how far back the card sits, the order the cards arrive in (far row
 * first) and how strongly each one follows the pointer (the nearest move most). A turned card
 * pivots on its outer edge, so its inner edge recedes toward the centre and it never swells past
 * its slot.
 *
 * Portrait screens (phones, tablets held upright): a 1000 x 1600 frame. A curated column keeps the
 * hierarchy (the hero screen on top, two pairs, the near pair at the foot) and the other sites sit
 * that orientation out; the details panel still steps through every one.
 */

export const FRAME_WIDTH = 1600;
export const PORTRAIT_FRAME_WIDTH = 1000;

// The far row: seven small screens, curving gently back towards its middle.
const FAR_COUNT = 7;
const FAR_WIDTH = 110;
const FAR_GAP = 6;
const FAR_START = (FRAME_WIDTH - (FAR_COUNT * FAR_WIDTH + (FAR_COUNT - 1) * FAR_GAP)) / 2;
const FAR_LIFT = [10, 5, 2, 0, 2, 5, 10];
const FAR_DEPTH = [0.8, 0.86, 0.93, 1, 0.93, 0.86, 0.8];
const FAR_TURN = [9, 6, 3, 0, -3, -6, -9];

const FAR_ROW = Array.from({ length: FAR_COUNT }, (_, index) => ({
    x: FAR_START + index * (FAR_WIDTH + FAR_GAP),
    y: 386 - FAR_LIFT[index],
    w: FAR_WIDTH,
    depth: FAR_DEPTH[index],
    turnY: FAR_TURN[index],
    tiltX: 0,
    roll: 0,
}));

// In page order: the first site is the hero screen, then the arcs, then the far row.
export const SLOTS = [
    { x: 566, y: 44, w: 468, depth: 0.6, turnY: 0, tiltX: -2, roll: 0 },
    { x: 236, y: 84, w: 352, depth: 0.45, turnY: 24, tiltX: -6, roll: -2 },
    { x: 1012, y: 96, w: 352, depth: 0.45, turnY: -24, tiltX: -6, roll: 2 },
    { x: 74, y: 262, w: 380, depth: 0.25, turnY: 30, tiltX: 0, roll: 2 },
    { x: 1146, y: 262, w: 380, depth: 0.25, turnY: -30, tiltX: 0, roll: -2 },
    { x: 120, y: 510, w: 330, depth: 0.1, turnY: 22, tiltX: 4, roll: 0 },
    { x: 1150, y: 510, w: 330, depth: 0.1, turnY: -22, tiltX: 4, roll: 0 },
    ...FAR_ROW,
];

// Portrait: slot index -> top-left corner, width and turn in portrait-frame pixels.
export const PORTRAIT_SLOTS = new Map([
    [0, { x: 100, y: 150, w: 800, turnY: 0 }],
    [1, { x: 30, y: 720, w: 450, turnY: 14 }],
    [2, { x: 520, y: 720, w: 450, turnY: -14 }],
    [7, { x: 170, y: 1060, w: 310, turnY: 8 }],
    [8, { x: 520, y: 1060, w: 310, turnY: -8 }],
    [5, { x: 30, y: 1300, w: 450, turnY: 12 }],
    [6, { x: 520, y: 1300, w: 450, turnY: -12 }],
]);
