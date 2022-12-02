import { Shape } from "./Shape";
import { Round } from "./Round";

export class RockPaperScissorsGame {
  constructor(
    public readonly rounds: Round[],
    public readonly playersScore: [number, number]
  ) {}
  add(round: Round) {
    return new RockPaperScissorsGame(
      [...this.rounds, round],
      this.addScore(this.playersScore, this.computeRoundScores(round))
    );
  }

  private computeRoundScores(round: Round): [number, number] {
    const bonus = [
      this.getShapeBonus(round.choices[0]),
      this.getShapeBonus(round.choices[1]),
    ];
    if (round.choices[0] === round.choices[1]) {
      return [bonus[0] + 3, bonus[1] + 3];
    }
    const player1Wins: [number, number] = [bonus[0] + 6, bonus[1]];
    const player2Wins: [number, number] = [bonus[0], bonus[1] + 6];
    if (round.choices[0] === Shape.Paper) {
      return round.choices[1] === Shape.Rock ? player1Wins : player2Wins;
    }
    if (round.choices[0] === Shape.Rock) {
      return round.choices[1] === Shape.Scissors ? player1Wins : player2Wins;
    }
    if (round.choices[0] === Shape.Scissors) {
      return round.choices[1] === Shape.Paper ? player1Wins : player2Wins;
    }
    return [0, 0];
  }

  private getShapeBonus(shape: Shape) {
    const shapeToPoint = {
      [Shape.Rock]: 1,
      [Shape.Paper]: 2,
      [Shape.Scissors]: 3,
    };
    return shapeToPoint[shape];
  }

  private addScore(
    score1: [number, number],
    score2: [number, number]
  ): [number, number] {
    return [score1[0] + score2[0], score1[1] + score2[1]];
  }
}
