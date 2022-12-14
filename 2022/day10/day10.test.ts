import { it, expect } from "vitest";
import { buildInstructions } from "./implementation/buildInstructions";
import { computeCycle } from "./implementation/computeCycle";
import { drawPixels } from "./implementation/drawPixels";

it("Can read a programm", () => {
  const instructions = buildInstructions(testInput);
  expect(instructions).toHaveLength(146);
  expect(instructions[2].type).toBe("addx");
  instructions[2].type === "addx" && expect(instructions[2].value).toBe(6);
});

it("Can execute a program", () => {
  const intialState = {
    instructionCycle: 0,
    instructionIndex: 0,
    register: 1,
    registers: [],
    pixels: [],
    instructions: buildInstructions(testInput),
  };
  const finalState = computeCycle(intialState);
  expect(finalState.registers[0]).toBe(1);
  expect(finalState.registers[2]).toBe(16);
  expect(finalState.registers[3]).toBe(5);
  expect(finalState.registers[18]).toBe(21); // End of Cycle 20 = index 19. During cycle 20 : index 18
  expect(finalState.registers[58]).toBe(19);
  expect(finalState.registers[98]).toBe(18);
  expect(finalState.registers[138]).toBe(21);
  expect(finalState.registers[178]).toBe(16);
  expect(finalState.registers[218]).toBe(18);
  const strength = [20, 60, 100, 140, 180, 220].reduce(
    (total, cycle) => total + cycle * finalState.registers[cycle - 2],
    0
  );
  expect(strength).toBe(13140);
});

it("Can draw the pixels", () => {
  const intialState = {
    instructionCycle: 0,
    instructionIndex: 0,
    register: 1,
    registers: [],
    pixels: [],
    instructions: buildInstructions(testInput),
  };
  const finalState = computeCycle(intialState);
  expect(drawPixels(finalState.pixels)).toBe(expectedDraw)
});

  
it("Result", () => {
  const intialState = {
    instructionCycle: 0,
    instructionIndex: 0,
    register: 1,
    registers: [],
    pixels: [],
    instructions: buildInstructions(input),
  };
  const finalState = computeCycle(intialState);
  const strength = [20, 60, 100, 140, 180, 220].reduce(
    (total, cycle) => total + cycle * finalState.registers[cycle - 2],
    0
  );
  console.log("Result day 10 1st part : ", strength);
  console.log(drawPixels(finalState.pixels));
});


const testInput = `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`;

const expectedDraw=`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######....`


const input = `
addx 1
addx 4
addx 1
noop
addx 4
addx 3
addx -2
addx 5
addx -1
noop
addx 3
noop
addx 7
addx -1
addx 1
noop
addx 6
addx -1
addx 5
noop
noop
noop
addx -37
addx 7
noop
noop
noop
addx 5
noop
noop
noop
addx 9
addx -8
addx 2
addx 5
addx 2
addx 5
noop
noop
addx -2
noop
addx 3
addx 2
noop
addx 3
addx 2
noop
addx 3
addx -36
noop
addx 26
addx -21
noop
noop
noop
addx 3
addx 5
addx 2
addx -4
noop
addx 9
addx 5
noop
noop
noop
addx -6
addx 7
addx 2
noop
addx 3
addx 2
addx 5
addx -39
addx 34
addx 5
addx -35
noop
addx 26
addx -21
addx 5
addx 2
addx 2
noop
addx 3
addx 12
addx -7
noop
noop
noop
noop
noop
addx 5
addx 2
addx 3
noop
noop
noop
noop
addx -37
addx 21
addx -14
addx 16
addx -11
noop
addx -2
addx 3
addx 2
addx 5
addx 2
addx -15
addx 6
addx 12
addx -2
addx 9
addx -6
addx 7
addx 2
noop
noop
noop
addx -33
addx 1
noop
addx 2
addx 13
addx 15
addx -21
addx 21
addx -15
noop
noop
addx 4
addx 1
noop
addx 4
addx 8
addx 6
addx -11
addx 5
addx 2
addx -35
addx -1
noop
noop
`;
