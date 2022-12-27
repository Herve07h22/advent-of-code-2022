import { Monkey, InpectionFunction } from "./Monkey";

export const inspectionRounds: (monkeys: Monkey[], nbOfRounds: number, inspectionFunction: InpectionFunction) => Monkey[] = (monkeys, nbOfRounds, inspectionFunction) => {
    if (nbOfRounds === 0)
        return monkeys;
    const updatedMonkeys = inspectAll(monkeys, 0, inspectionFunction);
    // console.log("== After round ", nbOfRounds)
    // updatedMonkeys.forEach( (monkey, index) => console.log(`Monkey ${index} inspected items ${monkey.inspectCount} times`))
    return inspectionRounds(updatedMonkeys, nbOfRounds - 1, inspectionFunction);
};
export const inspectAll: (monkeys: Monkey[], startIndex: number, inspectionFunction: InpectionFunction) => Monkey[] = (monkeys, startIndex, inspectionFunction) => {
    const updatedMonkeys = [...monkeys];
    for (let index = startIndex; index < updatedMonkeys.length; index++) {
        const divisor = monkeys.reduce((d, monkey) => d * monkey.test, 1);
        const { destination, updatedMonkey } = inspectionFunction(updatedMonkeys[index], divisor);
        if (destination) {
            updatedMonkeys[destination.destinationMonkey].items.push(destination.worryLevel);
            updatedMonkeys[index] = updatedMonkey;
            // console.log("Updated monkey :", updatedMonkey)
            return inspectAll(updatedMonkeys, index, inspectionFunction);
        }
    }
    return updatedMonkeys;
};
