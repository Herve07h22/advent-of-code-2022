import { MoveCrate } from "../FunctionTypes";
import { pull, push } from "./pushPull";

export const moveCrate9000: MoveCrate =
  (cargo) =>
  ({ numberOfCrates, from, to }) => {
    if (numberOfCrates === 0) return cargo;

    const [movedCrate, newStackFrom] = pull(cargo[from - 1]);
    const newStackTo = push(cargo[to - 1], movedCrate);
    const newGargo = [...cargo];
    newGargo[from - 1] = newStackFrom;
    newGargo[to - 1] = newStackTo;

    return moveCrate9000(newGargo)({
      numberOfCrates: numberOfCrates - 1,
      from,
      to,
    });
  };
