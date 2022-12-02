export class Elves {
  constructor(
    public readonly calories: number[] = [0],
    public readonly currentElfIndex: number = 0
  ) {}

  addCaloriesToCurrent(calorie) {
    const calories = [...this.calories];
    calories[this.currentElfIndex] += calorie;

    return new Elves(calories, this.currentElfIndex);
  }

  add() {
    return new Elves([...this.calories, 0], this.currentElfIndex + 1);
  }

  maxCalories() {
    const max = Math.max(...this.calories);
    return this.calories[this.calories.findIndex((c) => c === max)];
  }

  removeElfCarring(calories: number) {
    return new Elves(
      this.calories.filter((c) => c !== calories),
      this.currentElfIndex
    );
  }

  computeTop(iteration: number, total: number = 0) {
    if (iteration < 1)
      throw new Error("iteration should be greater or equal to 1");
    if (iteration === 1) {
      return total + this.maxCalories();
    } else {
      const top = this.maxCalories();
      return this.removeElfCarring(top).computeTop(iteration - 1, total + top);
    }
  }
}
