import { create } from "domain";
import { getSquare } from "./grid.utils";

/**
 * @Class
 * Represents a standard 9x9 sudoku grid
 */
export class SudokuGrid {
  static get gridSize() { return 9; }

  constructor() {
    this.grid = createEmptyGrid();
  }

  createEmptyGrid() {
    return Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
  }

  setCell(row, col, value) {
    this.grid[row][col] = value;
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

class SudokuHelper {
  constructor(grid) {
    this.grid = grid;
  }


}

export function createEmptyGrid() {
    return Array(9).fill(null).map(() => Array(9).fill(0));
}

export function isGridSolved(grid) {
    
}

function rowContains(grid, row, value) {
    return grid[row].includes(value);
}

function squareContains(grid, row, col, value) {
    let square = getGridSquare(grid, row, col);
    return square.includes(value)
}

function isApplicable(grid, row, col, value) {
    return !columnContains(grid, col, value) &&
           !rowContains(grid, row, value) &&
           !squareContains(grid, row, col, value);
}

function findUnnassigned(grid) {
    for(let i = 0; i < grid.length; ++i) {
        for(let j = 0; j < grid[i].length; ++j) {
            if(grid[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return [];
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