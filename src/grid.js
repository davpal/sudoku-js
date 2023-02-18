import { getSquare, isCellSafe, findEmptyCell } from "./grid.utils";

export const EASY = 5,
             MEDIUM = 10,
             HARD = 20,
             VERY_HARD = 50;

/**
 * @Class
 * Represents a standard 9x9 sudoku grid
 */
export class SudokuGrid {
  static get size() { return 9; }

  constructor() {
    this.reset();
  }

  createEmptyGrid() {
    return Array(SudokuGrid.size).fill(null).map(() => Array(SudokuGrid.size).fill(0));
  }

  setCell(row, col, value) {
    this.grid[row][col] = value;
  }

  reset() {
    this.grid = this.createEmptyGrid();
  }

  fill() {
    let [row, col] = findEmptyCell(this.grid);
    if(row === null) return true;

    for(let i = 1; i <= 9; i++) {
      const randNumber = (Math.random() * 9 + 1) >> 0;
      if(isCellSafe(this.grid, row, col, randNumber)) {
        this.setCell(row, col, randNumber);

        if(this.fill()) {
          return true;
        }
      }
    }

    this.grid[row][col] = 0;
    return false;
  }

  solve() { this.grid = this.solved }

  prepare(attempts) {
    this.solved = this.grid.map(row => [...row]);
    while(attempts--) {
      let row = Math.random() * 9 >> 0;
      let col = Math.random() * 9 >> 0;

      while(this.grid[row][col] == 0) {
        row = Math.random() * 9 >> 0;
        col = Math.random() * 9 >> 0;    
      }

      this.grid[row][col] = 0;
    }
  }
  
  isSolved() {
    for(let i = 0; i < 9; ++i) {
      let rowTotal = this.grid[i].reduce((a, b) => a + b, 0);
      if(rowTotal !== 45) return false;

      let colTotal = 0;
      for(let j = 0; j < 9; j++) {
          colTotal += this.grid[j][i];
      }
      if(colTotal !== 45) return false;
    }

    for(let i = 0; i < 9; i += 3) {
      for(let j = 0; j < 9; j += 3) {
        const squareSum = getSquare(this.grid, i, j).reduce((a, b) => a + b, 0);
        if(squareSum !== 45) return false;
      }
    }

    return true;
  }
}



