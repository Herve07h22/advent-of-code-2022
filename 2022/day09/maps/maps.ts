import { Position } from "../Position";

export const headCommandMap: Record<string, Position> = {
    "R": [1, 0],
    "L": [-1, 0],
    "U": [0, 1],
    "D": [0, -1],
};

export const tailCommandMap: Record<string, Record<string, Position>> = {
    '[1,0]': {
        "[1,0]": [1, 0],
        "[1,1]": [1, 1],
        "[1,-1]": [1, -1], // bottom right
    },
    '[1,1]': {
        "[1,0]": [1, 1],
        "[0,1]": [1, 1],
        "[1,1]": [1, 1],
        "[1,-1]": [1, 0],
        "[-1,1]": [0, 1],
    },
    '[0,1]': {
        "[0,1]": [0, 1],
        "[1,1]": [1, 1],
        "[-1,1]": [-1, 1],
    },
    '[-1,1]': {
        "[0,1]": [-1, 1],
        "[-1,0]": [-1, 1],
        "[1,1]": [0, 1],
        "[-1,1]": [-1, 1],
        "[-1,-1]": [-1, 0]
    },
    '[-1,0]': {
        "[-1,0]": [-1, 0],
        "[-1,1]": [-1, 1],
        "[-1,-1]": [-1, -1],
    },
    '[-1,-1]': {
        "[-1,0]": [-1, -1],
        "[0,-1]": [-1, -1],
        "[-1,1]": [-1, 0],
        "[-1,-1]": [-1, -1],
        "[1,-1]": [0, -1],
    },
    '[0,-1]': {
        "[0,-1]": [0, -1],
        "[-1,-1]": [-1, -1],
        "[1,-1]": [1, -1],
    },
    '[1,-1]': {
        "[1,0]": [1, -1],
        "[0,-1]": [1, -1],
        "[-1,-1]": [0, -1],
        "[1,-1]": [1, -1],
        "[1,1]": [1, 0],
    },
};
