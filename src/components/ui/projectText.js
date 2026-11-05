// Small text helpers shared by the sections that show projects.

// 7 -> "07".
export const pad = (number) => String(number).padStart(2, '0');

// A card's description: the project's teaser, or else the first sentence of its summary.
export const blurbFor = (project) => project.teaser ?? project.summary.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? project.summary;
