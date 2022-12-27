import { comparePackets } from "./comparePackets";
import { Packet } from "./Packet";

export function sumRightOrderIndices(pairs: [Packet, Packet][]) {
    return pairs
        .map((pair, index) => comparePackets(pair) === true ? (index + 1) : 0)
        .reduce((total, el) => total + el, 0);
}
