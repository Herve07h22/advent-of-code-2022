type Register = number;

type Instruction = {
    type: "noop";
} |
{
    type: "addx";
    value: number;
};
type ComputerState = {
    instructionCycle: number;
    instructionIndex: number;
    register: Register;
    registers: Register[];
    instructions: Instruction[];
    pixels: Array<"#" | ".">;
};

type InstructionState = {
    instructionCycle: number;
    register: Register;
};


export type ComputeCycle = (state: ComputerState) => ComputerState;

export type ComputeInstruction = (
    state: InstructionState,
    instruction: Instruction
) => InstructionState;

export type BuildInstructions = (program: string) => Instruction[];
