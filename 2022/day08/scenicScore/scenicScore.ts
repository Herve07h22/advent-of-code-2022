import { getAdjacentTrees } from "../common/getAdjacentTrees";

function getScore(value: number, line: number[]) {
  if (line.length === 0) return 0;
  const [next, ...rest] = line;
  if (next < value) return 1 + getScore(value, rest);
  return 1;
}
export function scenicScore(treeMap: number[][]) {
  return function (x: number, y: number) {
    const { valuesLeft, valuesRight, valuesTop, valuesBottom } =
      getAdjacentTrees(treeMap, y, x);
    const value = treeMap[y][x];

    return (
      getScore(value, valuesLeft.reverse()) *
      getScore(value, valuesRight) *
      getScore(value, valuesTop.reverse()) *
      getScore(value, valuesBottom)
    );
  };
}
export function highestScenicScore(map: number[][]): number {
  let highest = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (scenicScore(map)(x, y) > highest) {
        highest = scenicScore(map)(x, y);
      }
    }
  }
  return highest;
}
