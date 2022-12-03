import { findCommonString } from "./findCommonString";
import { computeItemsPrioritySum } from "./computeItemPriority";

export class Rucksack {
    constructor(public readonly compartiments: [string, string]) { }
    commonItems(): string[] {
        return findCommonString(this.compartiments[0], this.compartiments[1]);
    }
    items(): string {
        return this.compartiments[0] + this.compartiments[1];
    }

    commonItemsPrioritiesSum() {
        return computeItemsPrioritySum(this.commonItems());
    }
}
