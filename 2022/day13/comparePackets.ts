import { Packet } from "./Packet";


export function comparePackets(pair: [Packet, Packet]): boolean | undefined {
    // const normalizedPair = [convertItemToArray(pair[0]), convertItemToArray(pair[1])]
    // Left side is smaller, so inputs are in the right order
    if ((pair[0].length === 0) && (pair[1].length > 0))
        return true;

    // Right empty, left non empty -> wrong order
    if ((pair[1].length === 0) && (pair[0].length > 0))
        return false;

    // Both empty
    if ((pair[1].length === 0) && (pair[0].length === 0))
        return undefined;

    // Here we have 2 non empty arrays
    const [left, ...restOfLeftPacket] = pair[0];
    const [right, ...restOfRightPacket] = pair[1];

    // Both left and right are number
    if (typeof left === "number" && typeof right === "number") {
        if (left < right)
            return true;
        if (left > right)
            return false;
        // If equal, continue !
    } else {
        // One (or both) are array
        const nextResult = comparePackets([convertItemToArray(left), convertItemToArray(right)]);
        if (nextResult !== undefined)
            return nextResult;
    }

    const nextPair: [Packet, Packet] = [restOfLeftPacket, restOfRightPacket];
    return comparePackets(nextPair);

}
function convertItemToArray(item: number | Packet): Packet {
    if (typeof item === 'number') {
        return [item];
    }
    return item;
}
