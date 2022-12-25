import { it, expect } from "vitest";

type Monkey = {
  items: number[];
  operation: string; // * +
  amount: string; // number or "old"
  test: number;
  trueMonkey: number;
  falseMonkey: number;
  inspectCount: number;
};

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

const getInspectionMetrics: (monkeys:Monkey[], nbOfRounds:number, inspectionFunction:InpectionFunction) => number = (monkeys, nbOfRounds, inspectionFunction) => {
    const inspections = inspectionRounds(monkeys, nbOfRounds, inspectionFunction).map(monkey => monkey.inspectCount).sort( (a, b) => b-a)
    return inspections[0]*inspections[1]
}


const inspectionRounds: (monkeys:Monkey[], nbOfRounds:number, inspectionFunction:InpectionFunction)=> Monkey[] = (monkeys, nbOfRounds, inspectionFunction) => {
    if (nbOfRounds ===0) return monkeys
    const updatedMonkeys = inspectAll(monkeys, 0, inspectionFunction)
    // console.log("== After round ", nbOfRounds)
    // updatedMonkeys.forEach( (monkey, index) => console.log(`Monkey ${index} inspected items ${monkey.inspectCount} times`))
    return inspectionRounds(updatedMonkeys, nbOfRounds-1, inspectionFunction)
}
type InpectionFunction = (monkey:Monkey, divisor?:number) => { destination? : {worryLevel:number, destinationMonkey:number}, updatedMonkey:Monkey }

const inspectItem : InpectionFunction = (monkey) => {
    if (monkey.items.length === 0) return {updatedMonkey:monkey}
    const [item, ...otherItems] = monkey.items
    const updatedMonkey = {...monkey, items:otherItems, inspectCount:monkey.inspectCount+1}
    const worryLevel = Math.floor(calculate(item, monkey.operation, monkey.amount) / 3)
    const testResult =  (worryLevel % monkey.test) === 0
    return {destination : {worryLevel, destinationMonkey:testResult ? monkey.trueMonkey : monkey.falseMonkey}, updatedMonkey}
}

const optimizedInspectItem : InpectionFunction = (monkey, divisor=3) => {
    if (monkey.items.length === 0) return {updatedMonkey:monkey}
    const [item, ...otherItems] = monkey.items
    const updatedMonkey = {...monkey, items:otherItems, inspectCount:monkey.inspectCount+1}
    const worryLevel = calculate(item, monkey.operation, monkey.amount) % divisor
    const testResult =  (worryLevel % monkey.test) === 0
    return {destination : {worryLevel, destinationMonkey:testResult ? monkey.trueMonkey : monkey.falseMonkey}, updatedMonkey}
}


function calculate (item:number, operation:string, amount:string) {
    const value = amount === "old" ? item : parseInt(amount)
    switch (operation) {
        case '+' : return item + value 
        case "*" : return item * value
        default : throw new Error(`Operation ${operation} not supported`)
    }
}


const inspectAll: (monkeys:Monkey[], startIndex:number, inspectionFunction:InpectionFunction)=> Monkey[] = (monkeys, startIndex, inspectionFunction) => {
    const updatedMonkeys = [...monkeys]
    for (let index=startIndex; index<updatedMonkeys.length; index++) {
        // console.log("Inspecting ", updatedMonkeys[index])
        const divisor = monkeys.reduce((d, monkey) => d * monkey.test, 1);
        const {destination, updatedMonkey} = inspectionFunction(updatedMonkeys[index], divisor)
            if (destination) {
                updatedMonkeys[destination.destinationMonkey].items.push(destination.worryLevel)
                updatedMonkeys[index] = updatedMonkey
                // console.log("Updated monkey :", updatedMonkey)
                return inspectAll(updatedMonkeys, index, inspectionFunction)
            }
    }
    return updatedMonkeys
}



const readInstructions: (text: string) => Monkey[] = (text) =>
  text
    .trim()
    .split("\n\n")
    .map((monkey) => {
      let split = monkey.split("\n");
      let items = split[1]
        .replace("Starting items: ", "")
        .split(", ")
        .map((num) => parseInt(num));
      let operationSplit = split[2].split(" ");
      let operation = operationSplit.slice(-2)[0];
      let amount = operationSplit.slice(-1)[0];
      let test = parseInt(split[3].replace("Test: divisible by ", ""));
      let trueMonkey = parseInt(
        split[4].replace("If true: throw to monkey ", "")
      );
      let falseMonkey = parseInt(
        split[5].replace("If false: throw to monkey ", "")
      );

      return {
        items,
        operation,
        amount,
        test,
        trueMonkey,
        falseMonkey,
        inspectCount: 0,
      };
    });

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
