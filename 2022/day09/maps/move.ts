import { Position, positionToKey } from "../Position";


export const moveHead = (map: Record<string, Position>) => (direction: string) => {
    return map[direction];
};


export const moveTail = (map: Record<string, Record<string, Position>>) => (from: Position, direction: string, headPosition: Position) => {
    const headSituation = positionToKey([headPosition[0] - from[0], headPosition[1] - from[1]]); // `[${headPosition[0]-from[0]},${headPosition[1]-from[1]}]`
    if (headSituation in map) {
        if (direction in map[headSituation]) {
            return map[headSituation][direction];
        }
    }
    return [0, 0] as [number, number];
};
