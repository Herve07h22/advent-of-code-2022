import { Shape } from "./Shape";
import { Strategy } from "./Strategy";
import { mapCodeToShape } from "./strategy1";

export const strategy2: Strategy = (player1Code, player2Code) => [
  mapCodeToShape(player1Code),
  mapCodeToShapeToGetExpectedResult(player2Code)(mapCodeToShape(player1Code)),
];

function shapeToWinAgainst(shape: Shape) {
  const shapeToPlay = {
    [Shape.Rock]: Shape.Paper,
    [Shape.Paper]: Shape.Scissors,
    [Shape.Scissors]: Shape.Rock,
  };
  return shapeToPlay[shape];
}
function shapeToLoseAgainst(shape: Shape) {
  const shapeToPlay = {
    [Shape.Rock]: Shape.Scissors,
    [Shape.Paper]: Shape.Rock,
    [Shape.Scissors]: Shape.Paper,
  };
  return shapeToPlay[shape];
}
export function mapCodeToShapeToGetExpectedResult(code: string) {
  switch (code) {
    case "X":
      return shapeToLoseAgainst;
    case "Y":
      return (shape: Shape) => shape;
    case "Z":
      return shapeToWinAgainst;
    default:
      throw new Error(`Unknown shape : ${code}`);
  }
}
