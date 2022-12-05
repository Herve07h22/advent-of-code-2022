import { LoadInstructions } from "../FunctionTypes";

export const loadInstructions: LoadInstructions = (instructionsText) => {
  const match = Array.from(
    instructionsText.matchAll(/(move (\d+) from (\d) to (\d))/g)
  );
  return match.map((m) => ({
    numberOfCrates: parseInt(m[2]),
    from: parseInt(m[3]),
    to: parseInt(m[4]),
  }));
};
