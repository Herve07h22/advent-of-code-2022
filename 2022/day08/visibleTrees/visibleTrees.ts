import { getAdjacentTrees } from "../common/getAdjacentTrees";

export function isVisible(treeMap: number[][]) {
  return function (x: number, y: number) {
    const checkIfIsOnEdge = isOnEdge(treeMap);
    if (checkIfIsOnEdge(x, y)) return true;
    const { valuesLeft, valuesRight, valuesTop, valuesBottom } =
      getAdjacentTrees(treeMap, y, x);
    if (
      valuesLeft.some((value) => value >= treeMap[y][x]) &&
      valuesRight.some((value) => value >= treeMap[y][x]) &&
      valuesTop.some((value) => value >= treeMap[y][x]) &&
      valuesBottom.some((value) => value >= treeMap[y][x])
    )
      return false;
    return true;
  };
}
export function isOnEdge(map: number[][]) {
  return function (x: number, y: number) {
    if (x === 0 || y === 0) return true;
    if (x === map[0].length - 1 || y === map.length - 1) return true;
    return false;
  };
}
export function countVisibleTrees(map: number[][]): number {
  let total = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (isVisible(map)(x, y)) {
        total = total + 1;
      }
    }
  }
  return total;
}
