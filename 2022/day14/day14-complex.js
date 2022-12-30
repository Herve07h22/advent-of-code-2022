function pourSand(start) {
  let cp = { x: start.x, y: start.y };
  let sandUnits = 0;

  while (true) {
    let below = { x: cp.x, y: cp.y + 1 };
    let right = { x: cp.x + 1, y: cp.y };
    let left = { x: cp.x - 1, y: cp.y };

    if (below.y > hy || right.x > hx) {
      console.log("Units of sand: " + sandUnits);
      return map;
    }

    if (map[below.x][below.y] && map[below.x][below.y] === ".") {
      cp = { x: below.x, y: below.y };
    } else if (map[left.x] && map[left.x][below.y] === ".") {
      cp = { x: left.x, y: below.y };
    } else if (map[right.x] && map[right.x][below.y] === ".") {
      cp = { x: right.x, y: below.y };
    } else if (map[below.x][below.y] && map[below.x][below.y] === "o") {
      if (map[left.x] && map[left.x][below.y] === ".") {
        cp = { x: left.x, y: below.y };
      } else if (map[right.x] && map[right.x][below.y] === ".") {
        cp = { x: right.x, y: below.y };
      } else {
        map[cp.x][cp.y] = "o";
        cp = { x: start.x, y: start.y };
        sandUnits++;
      }
    } else if (map[below.x][below.y] && map[below.x][below.y] === "#") {
      map[cp.x][cp.y] = "o";
      cp = { x: start.x, y: start.y };
      sandUnits++;
    }
  }
  return map;
}
