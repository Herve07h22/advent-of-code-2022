import { Rucksack } from "./Rucksack";
import { findCommonString } from "./findCommonString";
import { computeItemsPrioritySum } from "./computeItemPriority";

export class RucksacksCollection {
    constructor(public readonly rucksacks: Rucksack[]) { }
    commonItemsPrioritiesSum() {
        return this.rucksacks.reduce(
            (total, item) => total + item.commonItemsPrioritiesSum(),
            0
        );
    }
    buildGroupsOf(n: number): Rucksack[][] {
        const nbOfGroups = Math.floor(this.rucksacks.length / n);
        return new Array(nbOfGroups)
            .fill([])
            .map((_, index) => [
                this.rucksacks[index * n],
                this.rucksacks[index * n + 1],
                this.rucksacks[index * n + 2],
            ]);
    }
    badges() {
        return this.buildGroupsOf(3).map(([first, ...others]) => others.reduce(
            (commonItems: string, r: Rucksack) => findCommonString(commonItems, r.items()).toLocaleString(),
            first.items()
        )
        );
    }
    badgesPriority(): number {
        return computeItemsPrioritySum(this.badges());
    }
}
