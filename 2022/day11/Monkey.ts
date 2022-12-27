export type Monkey = {
    items: number[];
    operation: string; // * +
    amount: string; // number or "old"
    test: number;
    trueMonkey: number;
    falseMonkey: number;
    inspectCount: number;
};
export type InpectionFunction = (monkey: Monkey, divisor?: number) => { destination?: { worryLevel: number; destinationMonkey: number; }; updatedMonkey: Monkey; };
