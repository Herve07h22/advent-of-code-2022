export function parseMap(map: string) {
  return map
    .trim()
    .split(`\n`)
    .map((line) => Array.from(line).map((value) => parseInt(value)));
}
