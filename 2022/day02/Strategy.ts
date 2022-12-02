import { Shape } from "./Shape";

export type Strategy = (
  player1Code: string,
  player2Code: string
) => [Shape, Shape];
