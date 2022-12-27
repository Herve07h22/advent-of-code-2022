import { Packet } from "./Packet";

export function readPackets(message: string): [Packet, Packet][] {
    const pairs = message.trim().split('\n\n');
    return pairs.map(pair => {
        const [packet1, packet2] = pair.split('\n');
        // dangerous trick !
        return [eval(packet1), eval(packet2)] as [Packet, Packet];
    });
}
