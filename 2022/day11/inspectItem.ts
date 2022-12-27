import { InpectionFunction } from "./Monkey";

export const inspectItem: InpectionFunction = (monkey) => {
    if (monkey.items.length === 0)
        return { updatedMonkey: monkey };
    const [item, ...otherItems] = monkey.items;
    const updatedMonkey = { ...monkey, items: otherItems, inspectCount: monkey.inspectCount + 1 };
    const worryLevel = Math.floor(calculate(item, monkey.operation, monkey.amount) / 3);
    const testResult = (worryLevel % monkey.test) === 0;
    return { destination: { worryLevel, destinationMonkey: testResult ? monkey.trueMonkey : monkey.falseMonkey }, updatedMonkey };
};
export const optimizedInspectItem: InpectionFunction = (monkey, divisor = 3) => {
    if (monkey.items.length === 0)
        return { updatedMonkey: monkey };
    const [item, ...otherItems] = monkey.items;
    const updatedMonkey = { ...monkey, items: otherItems, inspectCount: monkey.inspectCount + 1 };
    const worryLevel = calculate(item, monkey.operation, monkey.amount) % divisor;
    const testResult = (worryLevel % monkey.test) === 0;
    return { destination: { worryLevel, destinationMonkey: testResult ? monkey.trueMonkey : monkey.falseMonkey }, updatedMonkey };
};
function calculate(item: number, operation: string, amount: string) {
    const value = amount === "old" ? item : parseInt(amount);
    switch (operation) {
        case '+': return item + value;
        case "*": return item * value;
        default: throw new Error(`Operation ${operation} not supported`);
    }
}
