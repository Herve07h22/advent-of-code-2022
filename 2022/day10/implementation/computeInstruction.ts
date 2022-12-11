import { ComputeInstruction } from "../Types";

export const computeInstruction: ComputeInstruction = (state, instruction) => {
    switch (instruction.type) {
        case "noop":
            return {
                instructionCycle: 0,
                register: state.register,
            };
        case "addx":
            return {
                instructionCycle: state.instructionCycle === 1 ? 0 : 1,
                register: state.instructionCycle === 1
                    ? state.register + instruction.value
                    : state.register,
            };
        default:
            throw new Error("Unknown instruction");
    }
};
