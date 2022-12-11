import { BuildInstructions } from "../Types";

export const buildInstructions: BuildInstructions = (program) => {
    return program
        .trim()
        .split("\n")
        .map((line) => {
            if (line.startsWith("addx"))
                return { type: "addx", value: parseInt(line.slice(4)) };
            return { type: "noop" };
        });
};
