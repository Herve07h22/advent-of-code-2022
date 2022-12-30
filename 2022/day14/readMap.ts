export function readMap(solidRockStructureMap: string): string[][] {
    // Get input data
    const lines = solidRockStructureMap.trim().split("\n");

    const rocks = lines.map((rock) => {
        const coords = rock.split(" -> ").map((c) => {
            const [x, y] = c.split(",");
            return { x: parseInt(x, 10), y: parseInt(y, 10) };
        });
        return coords;
    });

    let hx = 0;
    let hy = 0;
    for (let i = 0; i < rocks.length; i++) {
        for (let j = 0; j < rocks[i].length; j++) {
            const coord = rocks[i][j];
            hx = Math.max(hx, coord.x);
            hy = Math.max(hy, coord.y);
        }
    }
    // Create the map and fill each point with .
    let map: string[][] = new Array(hx + 1)
        .fill([])
        .map(() => new Array(hy + 1).fill("."));
    // Add sand point
    map[500][0] = "+";
    // Draw rocks in the map
    for (const path of rocks) {
        for (let i = 1; i < path.length; i++) {
            if (path[i].x === path[i - 1].x) {
                if (path[i].y > path[i - 1].y) {
                    for (let j = path[i - 1].y; j <= path[i].y; j++) {
                        map[path[i].x][j] = "#";
                    }
                } else {
                    for (let j = path[i - 1].y; j >= path[i].y; j--) {
                        map[path[i].x][j] = "#";
                    }
                }
            } else if (path[i].y === path[i - 1].y) {
                if (path[i].x > path[i - 1].x) {
                    for (let j = path[i - 1].x; j <= path[i].x; j++) {
                        map[j][path[i].y] = "#";
                    }
                } else {
                    for (let j = path[i - 1].x; j >= path[i].x; j--) {
                        map[j][path[i].y] = "#";
                    }
                }
            }
        }
    }
    return map;
}
export function addFloorToMap(solidRockStructureMap: string): string[][] {
    const map = readMap(solidRockStructureMap);
    const sizeX = map.length;
    const sizeY = map[0].length;
    const addedFloor = `1,${sizeY + 1} -> ${sizeX + 2 * sizeY},${sizeY + 1}`; // 498,4 -> 498,6
    return readMap(solidRockStructureMap + addedFloor);
}
