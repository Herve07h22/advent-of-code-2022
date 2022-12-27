import { Packet } from "./Packet";
import { comparePackets } from "./comparePackets";

export function findDecoderKey(pairs: [Packet, Packet][]) {
    const packets = pairs.flatMap(pair => [pair[0], pair[1]]);
    const packetsAndDividers = [...packets, [[2]], [[6]]];
    const sortedPacketsAndDividers = packetsAndDividers.sort((p1, p2) => !!comparePackets([p1, p2]) ? -1 : 1);
    return [2, 6].reduce((total, divider) => {
        const dividerIndex = sortedPacketsAndDividers.findIndex(el => el.length === 1 && el[0][0] === divider);
        if (dividerIndex === -1)
            return total;
        return total * (dividerIndex + 1);
    }, 1);
}
