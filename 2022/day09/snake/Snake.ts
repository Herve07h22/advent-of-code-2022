import { moveHead, moveTail } from "../maps/move";
import { Position, addPosition, distance, positionToKey } from "../Position";
import { headCommandMap, tailCommandMap } from "../maps/maps";

export class Snake {
    constructor(public nbOfTails: number = 1) {
        this.tails = new Array(nbOfTails).fill([0, 0]);
    }
    public head: Position = [0, 0];
    public tails: Position[];
    public visitedPlacesByTail: Set<string> = new Set();
    private headerMover = moveHead(headCommandMap);
    private tailMover = moveTail(tailCommandMap);

    move(direction: string) {
        const headMovement = this.headerMover(direction);
        const tailsMovement = new Array(this.nbOfTails).fill([0, 0]);
        for (let tailIndex = 0; tailIndex < this.nbOfTails; tailIndex++) {
            tailsMovement[tailIndex] = this.tailMover(this.tails[tailIndex], positionToKey(tailIndex === 0 ? headMovement : tailsMovement[tailIndex - 1]), tailIndex === 0 ? this.head : this.tails[tailIndex - 1]);
        }

        for (let tailIndex = 0; tailIndex < this.nbOfTails; tailIndex++) {
            this.tails[tailIndex] = addPosition(this.tails[tailIndex], tailsMovement[tailIndex]);
        }
        const previousTails = [...this.tails];
        this.head = addPosition(this.head, headMovement);
        const lastTail = this.tails[this.nbOfTails - 1];
        this.visitedPlacesByTail.add(`${lastTail[0]}-${lastTail[1]}`);

        for (let tailIndex = 0; tailIndex < this.nbOfTails - 1; tailIndex++) {
            const d = distance(this.tails[tailIndex], this.tails[tailIndex + 1]);
            if (d > 2) {
                throw new Error("Cut snake !");
            }
        }
    }
}
