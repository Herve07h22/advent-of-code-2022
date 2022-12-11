import { computeInstruction } from "./computeInstruction";
import { ComputeCycle } from "../Types";

export const computeCycle: ComputeCycle = (state) => {
    const currentPixelPosition = (state.registers.length % 40);
    const pixel: "#" | "." = [
        state.register - 1,
        state.register,
        state.register + 1,
    ].includes(currentPixelPosition)
        ? "#"
        : ".";

    const instruction = state.instructions[state.instructionIndex];
    const { instructionCycle, register } = computeInstruction(state, instruction);
    const registers = [...state.registers, register];
    const instructionIndex = state.instructionIndex + (instructionCycle === 0 ? 1 : 0);

    const pixels = [...state.pixels, pixel];
    const nextState = {
        instructionCycle,
        register,
        registers,
        pixels,
        instructionIndex,
        instructions: state.instructions,
    };
    if (instructionIndex === state.instructions.length - 1)
        return nextState;
    return computeCycle(nextState);
};
