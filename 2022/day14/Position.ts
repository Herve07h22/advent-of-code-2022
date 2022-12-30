export type Position = { x: number; y: number; };

export const sandSourcePosition: Position = { x: 500, y: 0 };

export const samePosition = (p1: Position, p2: Position) => p1.x === p2.x && p1.y == p2.y;

export const straightFall = (position: Position) => ({
    x: position.x,
    y: position.y + 1,
});
export const leftFall = (position: Position) => ({
    x: position.x - 1,
    y: position.y + 1,
});
export const rightFall = (position: Position) => ({
    x: position.x + 1,
    y: position.y + 1,
});
export const dontMove = (position: Position) => position;
