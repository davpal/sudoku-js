import { expect } from 'chai';
import { SudokuGrid } from '../src/grid';
import { getSquare,
         rowIncludes,
         columnIncludes,
         squareIncludes,
         isCellSafe,
         findEmptyCell } from '../src/grid.utils.js';


describe('SudokuGrid', () => {
  it('should create gird filled with zeros', () => {
    const sudokuGrid = new SudokuGrid();
    sudokuGrid.grid.forEach(row => expect(row).to.eql(Array(9).fill(0)));
  });

  it('should value of specific cell', () => {
    const sudokuGrid = new SudokuGrid();
    const row = 3, col = 4, value = 5;
    sudokuGrid.setCell(row, col, value);
    expect(sudokuGrid.grid[row][col]).equal(value);
  });

  it('should tells that grid is solved', () => {
    const sudokuGrid = new SudokuGrid();
    expect(sudokuGrid.isSolved()).to.be.false;
  });
});

describe('grid-utils', () => {
  const grid = [
    [1, 2, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 2, 7, 0, 0, 0],
    [8, 7, 9, 0, 0, 0, 0, 0, 0]
  ];

  it('should return values of belonged square', () => {
    const square1 = getSquare(grid, 1, 1);
    const square2 = getSquare(grid, 2, 5);
    expect(square1).to.eql([1, 2, 3, 0, 0, 0, 8, 7, 9]);
    expect(square2).to.eql([0, 0, 0, 3, 2, 7, 0, 0, 0]);
  });

  it('should find value in row', () => {
    const row = 1, value = 7;
    expect(rowIncludes(grid, row, value)).to.be.true;
  });

  it('should find value in column', () => {
    const column = 2, value = 9;
    expect(columnIncludes(grid, column, value)).to.be.true;
  });

  it('should find value in square', () => {
    const row = 1, col = 4, value = 7;
    expect(squareIncludes(grid, row, col, value)).to.be.true;
  });

  it('should check if value not breaking grid', () => {
    const row = 1, col = 1
    expect(isCellSafe(grid, row, col, 3)).to.be.false;
    expect(isCellSafe(grid, row, col, 7)).to.be.false;
    expect(isCellSafe(grid, row, col, 8)).to.be.false;
    expect(isCellSafe(grid, row, col, 4)).to.be.true;
    expect(isCellSafe(grid, row, col, 5)).to.be.true;
    expect(isCellSafe(grid, row, col, 6)).to.be.true;
  });

  it('should return first empty cell (equal to zero)', () => {
    expect(findEmptyCell(grid)).to.eql([0, 3]);
  });
});