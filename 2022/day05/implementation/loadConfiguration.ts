import { Cargo, LoadConfiguration } from "../FunctionTypes";
import { pushToBottom } from "./pushPull";

export const loadConfiguration: LoadConfiguration = (plan) => {
  const lines = plan.split(`\n`);
  const cargo: Cargo = [[], [], [], [], [], [], [], [], []];
  for (const line of lines) {
    if (line.startsWith(" 1")) return cargo;
    const chars = Array.from(line);
    for (let index = 0; index < chars.length; index++) {
      const nextCrate = chars[1 + index * 4];

      if (nextCrate && nextCrate !== " ") {
        cargo[index] = pushToBottom(cargo[index], nextCrate);
      }
    }
  }
  return cargo;
};
