import {
  sandSourcePosition,
  Position,
  samePosition,
  straightFall,
  leftFall,
  rightFall,
  dontMove,
} from "./Position";

type State = {
  rocksAndSandMap: string[][];
  position: Position;
  nbOfFallenSand: number;
  gameOver: boolean;
};

export function simulatePouringSand(rocksAndSandMap: string[][]) {
  var state: State = {
    rocksAndSandMap,
    position: sandSourcePosition,
    nbOfFallenSand: 0,
    gameOver: false,
  };
  while (!state.gameOver) {
    const nextState = move(state);
    state = nextState;
  }
  return state;
}

export function move(state: State): State {
  const { rocksAndSandMap, position, nbOfFallenSand, gameOver } = state;
  const sizeX = rocksAndSandMap.length;
  const sizeY = rocksAndSandMap[0].length;
  const updatedState = (movement: (p: Position) => Position) => ({
    rocksAndSandMap,
    position: movement(position),
    nbOfFallenSand,
    gameOver: gameOver || samePosition(movement(position), position),
  });

  // Out of range or full = Game over
  if (
    position.y + 1 === sizeY ||
    position.x + 1 === sizeX ||
    (samePosition(position, sandSourcePosition) &&
      rocksAndSandMap[position.x][position.y] !== "+")
  ) {
    return updatedState(dontMove);
  }

  // Straight fall
  if (rocksAndSandMap[position.x][position.y + 1] === ".") {
    return updatedState(straightFall);
  }

  // left available
  if (rocksAndSandMap[position.x - 1][position.y + 1] === ".") {
    return updatedState(leftFall);
  }

  // right available
  if (rocksAndSandMap[position.x + 1][position.y + 1] === ".") {
    return updatedState(rightFall);
  }

  rocksAndSandMap[position.x][position.y] = "o";

  return {
    rocksAndSandMap,
    position: sandSourcePosition,
    nbOfFallenSand: nbOfFallenSand + 1,
    gameOver: false,
  };
}
