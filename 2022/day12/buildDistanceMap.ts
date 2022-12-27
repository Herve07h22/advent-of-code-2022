import {
    findLetter,
    findLetters,
    getLetterValue,
    isInTheMap,
    sizeOfMap
} from "./elevationMap";

export function buildDistanceMap(
  textMap: string,
  [x, y]: [number, number],
  size: [number, number],
  distanceMap: number[][]
) {
  const centerValue = getLetterValue([x, y], textMap);

  const offsets: [number, number][] = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  offsets.forEach(([offsetX, offsetY]) => {
    const nextCoord: [number, number] = [x + offsetX, y + offsetY];
    if (isInTheMap(nextCoord, size)) {
      const offsetValue = getLetterValue(nextCoord, textMap);
      // offset value should be 1 less than center value, equal, or greater
      const allowedMove =
        centerValue - offsetValue === 1 ||
        offsetValue === centerValue ||
        offsetValue > centerValue;
      if (allowedMove) {
        const shouldBeUpdated =
          distanceMap[y + offsetY][x + offsetX] === -1 ||
          distanceMap[y + offsetY][x + offsetX] > distanceMap[y][x] + 1;
        if (shouldBeUpdated) {
          distanceMap[y + offsetY][x + offsetX] = distanceMap[y][x] + 1;
          buildDistanceMap(
            textMap,
            [x + offsetX, y + offsetY],
            size,
            distanceMap
          );
        }
      }
    }
  });

  return distanceMap;
}

export function buildEmptyDistanceMap(textMap: string): number[][] {
  const size = sizeOfMap(textMap);
  const [x, y] = findLetter(textMap, "E");
  const distanceMap = new Array(size[1])
    .fill([])
    .map((line) => new Array(size[0]).fill(-1));
  distanceMap[y][x] = 0;
  return distanceMap;
}

export function findShortestPathFrom(
  textMap: string,
  startLetter: string,
  distanceMap: number[][]
) {
  const startingPoints = findLetters(textMap, startLetter);
  return Math.min(
    ...startingPoints
      .map(([x, y]) => distanceMap[y][x])
      .filter((distance) => distance !== -1)
  );
}
