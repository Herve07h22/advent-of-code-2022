import { it, expect } from "vitest";
import { getInspectionMetrics } from "./getInspectionMetrics";
import { inspectAll, inspectionRounds } from "./inspectAll";
import { inspectItem, optimizedInspectItem } from "./inspectItem";
import { readInstructions } from "./readInstructions";

it("Can read the instructions to build the monkeys", () => {
    const monkeys = readInstructions(testInput)
    expect(monkeys).toHaveLength(4)
    expect(monkeys[0].operation).toBe("*")
    expect(monkeys[1].operation).toBe("+")
    expect(monkeys[1].amount).toBe("6")
    expect(monkeys[2].amount).toBe("old")
    expect(monkeys[2].items).toEqual([79,60,97])
})

it("A monkey do the right computation for the 1st round and 1st item", () => {
    const monkeys = readInstructions(testInput)
    const {destination, updatedMonkey} = inspectItem(monkeys[0])
    expect(destination?.destinationMonkey).toBe(3)
    expect(destination?.worryLevel).toBe(500)
    expect(updatedMonkey.items).toEqual([98])
    expect(updatedMonkey.inspectCount).toBe(1)
})

it("We can guess the list of updates after 1 round", () => {
    const monkeys = readInstructions(testInput)
    const updatedMonkeys = inspectAll(monkeys, 0, inspectItem)
    expect(updatedMonkeys).toHaveLength(4)
    expect(updatedMonkeys[0].items).toEqual([20,23,27,26])
    expect(updatedMonkeys[1].items).toEqual([2080, 25, 167, 207, 401, 1046])
    expect(updatedMonkeys[2].items).toHaveLength(0)
    expect(updatedMonkeys[3].items).toHaveLength(0)
})

it("We can guess the list of updates after 20 rounds", () => {
    const monkeys = readInstructions(testInput)
    const updatedMonkeys = inspectionRounds(monkeys, 20, inspectItem)
    expect(updatedMonkeys).toHaveLength(4)
    expect(updatedMonkeys[0].items).toEqual([10, 12, 14, 26, 34])
    expect(updatedMonkeys[0].inspectCount).toBe(101)
    expect(updatedMonkeys[3].inspectCount).toBe(105)
})

it("We can compute the score after 20 rounds", () => {
    const monkeys = readInstructions(testInput)
    const result = getInspectionMetrics(monkeys, 20, inspectItem)
    expect(result).toBe(10605)
})

it("We can compute the score after 10000 rounds with optimized function", () => {
    const monkeys = readInstructions(testInput)
    const result = getInspectionMetrics(monkeys, 10000, optimizedInspectItem)
    expect(result).toBe(2713310158)
})

it("Result", () => {
    const monkeys = readInstructions(input)
    const result = getInspectionMetrics(monkeys, 20, inspectItem)
    console.log(`Day 10 phase 1 : ${result}`)
    const monkeys2 = readInstructions(input)
    const result2 = getInspectionMetrics(monkeys2, 10000 , optimizedInspectItem)
    console.log(`Day 10 phase 2 : ${result2}`)
})

const testInput = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`

const input = `
Monkey 0:
  Starting items: 74, 73, 57, 77, 74
  Operation: new = old * 11
  Test: divisible by 19
    If true: throw to monkey 6
    If false: throw to monkey 7

Monkey 1:
  Starting items: 99, 77, 79
  Operation: new = old + 8
  Test: divisible by 2
    If true: throw to monkey 6
    If false: throw to monkey 0

Monkey 2:
  Starting items: 64, 67, 50, 96, 89, 82, 82
  Operation: new = old + 1
  Test: divisible by 3
    If true: throw to monkey 5
    If false: throw to monkey 3

Monkey 3:
  Starting items: 88
  Operation: new = old * 7
  Test: divisible by 17
    If true: throw to monkey 5
    If false: throw to monkey 4

Monkey 4:
  Starting items: 80, 66, 98, 83, 70, 63, 57, 66
  Operation: new = old + 4
  Test: divisible by 13
    If true: throw to monkey 0
    If false: throw to monkey 1

Monkey 5:
  Starting items: 81, 93, 90, 61, 62, 64
  Operation: new = old + 7
  Test: divisible by 7
    If true: throw to monkey 1
    If false: throw to monkey 4

Monkey 6:
  Starting items: 69, 97, 88, 93
  Operation: new = old * old
  Test: divisible by 5
    If true: throw to monkey 7
    If false: throw to monkey 2

Monkey 7:
  Starting items: 59, 80
  Operation: new = old + 6
  Test: divisible by 11
    If true: throw to monkey 2
    If false: throw to monkey 3
`;
