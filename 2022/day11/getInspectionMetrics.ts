import { inspectionRounds } from "./inspectAll";
import { Monkey, InpectionFunction } from "./Monkey";

export const getInspectionMetrics: (monkeys: Monkey[], nbOfRounds: number, inspectionFunction: InpectionFunction) => number = (monkeys, nbOfRounds, inspectionFunction) => {
    const inspections = inspectionRounds(monkeys, nbOfRounds, inspectionFunction).map(monkey => monkey.inspectCount).sort((a, b) => b - a);
    return inspections[0] * inspections[1];
};
