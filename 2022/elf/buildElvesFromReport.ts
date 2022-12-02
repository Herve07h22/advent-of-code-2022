import { Elves } from "./Elves";

export function buildElvesFromReport(input: string) {
  return input
    .trim()
    .split("\n")
    .reduce(
      (elves, line) =>
        line ? elves.addCaloriesToCurrent(parseInt(line)) : elves.add(),
      new Elves()
    );
}
