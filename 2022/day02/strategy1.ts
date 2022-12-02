import { Shape } from "./Shape";
import { Strategy } from "./Strategy";

export const strategy1: Strategy = (player1Code, player2Code) => [
  mapCodeToShape(player1Code),
  mapCodeToShape(player2Code),
];

export function mapCodeToShape(code: string) {
  switch (code) {
    case "A":
    case "X":
      return Shape.Rock;
    case "B":
    case "Y":
      return Shape.Paper;
    case "C":
    case "Z":
      return Shape.Scissors;
    default:
      throw new Error(`Unknown shape : ${code}`);
  }
}
