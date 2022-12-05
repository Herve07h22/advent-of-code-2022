import { MoveCrate } from "../FunctionTypes";
import { pull, pullMany, push, pushMany } from "./pushPull";

export const moveCrate9001: MoveCrate =
  (cargo) =>
  ({ numberOfCrates, from, to }) => {
    const [movedCrates, newStackFrom] = pullMany(
      cargo[from - 1],
      numberOfCrates
    );
    const newStackTo = pushMany(cargo[to - 1], movedCrates);
    const newGargo = [...cargo];
    newGargo[from - 1] = newStackFrom;
    newGargo[to - 1] = newStackTo;

    return newGargo;
  };
