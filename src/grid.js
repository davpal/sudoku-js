import { getSquare, isCellSafe, findEmptyCell } from "./grid.utils";

const difficultyToAttempts = {
  'easy': 5,
  'medium': 10,
  'hard': 20,
  'very hard': 25
};

/**
 * @Class
 * Represents a standard 9x9 sudoku grid
 */
export class SudokuGrid {
  static get size() { return 9; }

  constructor() {
    this.grid = this.createEmptyGrid();
  }

  createEmptyGrid() {
    return Array(SudokuGrid.size).fill(null).map(() => Array(SudokuGrid.size).fill(0));
  }

  setCell(row, col, value) {
    this.grid[row][col] = value;
  }

  fill() {
    let [row, col] = findEmptyCell(this.grid);
    if(row === null) return true;

    for(let i = 1; i <= 9; i++) {
      const randNumber = (Math.random() * 9 + 1) >> 0;
      if(isCellSafe(this.grid, row, col, randNumber)) {
        this.grid[row][col] = randNumber;

        if(this.fill()) {
          return true;
        }
      }
    }

    this.grid[row][col] = 0;
    return false;
  }

  prepare(difficulty) {
    const attempts = difficultyToAttempts[difficulty];
    while(attempts) {
      let row = Math.random() * 9 >> 0;
      let col = Math.random() * 9 >> 0;

      while(grid[row][col] == 0) {
          row = Math.random() * 9 >> 0;
          col = Math.random() * 9 >> 0;    
      }
      let backup = grid[row][col];
      grid[row][col] = 0;

      let gridCopy = grid.slice();

      counter = 0;
      solveGrid(gridCopy);
      if(counter != 1) {
          grid[row][col] = backup;
          --attempts;
      }
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



let counter = 0;
function solveGrid(grid) {
    let [row, col] = findUnnassigned(grid);
    if(!row) return true;

    for(let i = 1; i <= 9; i++) {
        if(isApplicable(grid, row, col, i)) {
            grid[row][col] = i;
            
            if(checkGrid(grid)) {
                counter++;
                break;
            }

            if(solveGrid(grid)) {
                return true;
            }

            grid[row][col] = 0;
        }
    }

    grid[row][col] = 0;
      
    return false;
}