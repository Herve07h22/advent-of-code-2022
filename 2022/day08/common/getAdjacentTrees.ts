export function getAdjacentTrees(treeMap: number[][], y: number, x: number) {
  const valuesLeft = treeMap[y].slice(0, x);
  const valuesRight = treeMap[y].slice(x + 1);
  const valuesTop = treeMap.map((line) => line[x]).slice(0, y);
  const valuesBottom = treeMap.map((line) => line[x]).slice(y + 1);
  return { valuesLeft, valuesRight, valuesTop, valuesBottom };
}
