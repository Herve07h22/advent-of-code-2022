
export type Position = [number, number];

export const addPosition: (p1: Position, p2: Position) => Position = (p1, p2) => [p1[0] + p2[0], p1[1] + p2[1]];

export const distance: (p1: Position, p2: Position) => number = (p1, p2) => (p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2;

export const positionToKey = (position:Position) => `[${position[0]},${position[1]}]`
