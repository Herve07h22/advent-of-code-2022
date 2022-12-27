

export function getLetterValue(coord: [number, number], textMap: string) {
    const lines = textMap.trim().split("\n");
    return valueOf(lines[coord[1]][coord[0]]);
}

export function isInTheMap(
    coord: [number, number],
    mapSize: [number, number]
): boolean {
    if (coord[0] >= 0 &&
        coord[0] < mapSize[0] &&
        coord[1] >= 0 &&
        coord[1] < mapSize[1])
        return true;
    return false;
}

export function findLetter(textMap: string, letter: string): [number, number] {
    const lines = textMap.trim().split("\n");
    const indexY = lines.findIndex((line) => line.includes(letter));
    const indexX = lines[indexY].indexOf(letter);
    return [indexX, indexY];
}

export function findLetters(textMap: string, letter: string): [number, number][] {
    const positions: [number, number][] = [];
    const lines = textMap.trim().split("\n");
    for (let y = 0; y < lines.length; y++) {
        if (lines[y].includes(letter)) {
            for (let x = 0; x < lines[y].length; x++) {
                if (letter === lines[y][x])
                    positions.push([x, y]);
            }
        }
    }
    return positions;
}
export function valueOf(letter: string) {
    if (letter === "E")
        return 26;
    if (letter === "S")
        return 1;
    return letter.charCodeAt(0) - 96;
}

export function sizeOfMap(textMap: string): [number, number] {
    const lines = textMap.trim().split("\n");
    return [lines[0].length, lines.length];
}
