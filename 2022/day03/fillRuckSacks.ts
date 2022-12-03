import { Rucksack } from "./Rucksack";
import { RucksacksCollection } from "./RucksacksCollection";

export function fillRuckSacks(textInput: string) {
    return new RucksacksCollection(
        textInput
            .trim()
            .split("\n")
            .map((line) => {
                const lineLength = line.length;
                if (lineLength % 2 !== 0)
                    throw new Error(`The length of line ${line} is not odd`);
                const comp1 = line.slice(0, lineLength / 2);
                const comp2 = line.slice(lineLength / 2);
                return new Rucksack([comp1, comp2]);
            })
    );
}
