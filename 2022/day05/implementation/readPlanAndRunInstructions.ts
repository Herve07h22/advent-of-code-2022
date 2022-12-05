import { MoveCrate } from "../FunctionTypes";
import { getTop } from "./pushPull";
import { loadConfiguration } from "./loadConfiguration";
import { loadInstructions } from "./loadInstructions";

export function readPlanAndRunInstructions(
  mapAndInstructions: string,
  crateMover: MoveCrate
) {
  const cargo = loadConfiguration(mapAndInstructions);
  const instructions = loadInstructions(mapAndInstructions);
  const newCargo = instructions.reduce(
    (nextCargo, instruction) => crateMover(nextCargo)(instruction),
    cargo
  );
  const display = newCargo.map((stack) => getTop(stack)).join("");
  return display;
}
