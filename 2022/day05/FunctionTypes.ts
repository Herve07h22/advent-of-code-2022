// A cargo has a list of stacks
export type Cargo = Stack[];

// A stack is a stack of Crates
type Stack = Crate[];

// A Crate is a letter
export type Crate = string;

// Move
type Instruction = { numberOfCrates: number; from: number; to: number };
export type MoveCrate = (cargo: Cargo) => (instruction: Instruction) => Cargo;

// load configuration
export type LoadConfiguration = (plan: string) => Cargo;
export type LoadInstructions = (instructionsText: string) => Instruction[];

// get the top element of a stack
export type GetTop = (stack: Stack) => Crate;

// pull the top element of a stack
export type Pull = (stack: Stack) => [Crate, Stack];
export type PullMany = (
  stack: Stack,
  numberOfCrates: number
) => [Crate[], Stack];

// push
export type Push = (stack: Stack, crate: Crate) => Stack;
export type PushMany = (stack: Stack, crates: Crate[]) => Stack;
