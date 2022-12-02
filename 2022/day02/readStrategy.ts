import { strategy1 } from "./strategy1";
import { Round } from "./Round";
import { RockPaperScissorsGame } from "./RockPaperScissorsGame";

export function readStrategy(input: string, strategy = strategy1) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [player1Code, player2Code] = line.split(" ");
      const round: Round = { choices: strategy(player1Code, player2Code) };

      return round;
    })
    .reduce(
      (game, round) => game.add(round),
      new RockPaperScissorsGame([], [0, 0])
    );
}
