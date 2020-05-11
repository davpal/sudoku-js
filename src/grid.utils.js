export function getSquare(grid, row, col) {
  let square = [];

  let si = (row / 3 >> 0) * 3;
  let sj = (col / 3 >> 0) * 3;

  for(let i = si; i < si + 3; ++i) {
      for(let j = sj; j < sj + 3; ++j) {
          square.push(grid[i][j]);
      }
  }

  return square;
}

export function rowIncludes(grid, row, value) {
  return grid[row].includes(value);
}

export function columnIncludes(grid, col, value) {
  for(let i = 0; i < grid.length; ++i) {
      if(grid[i][col] === value) {
          return true;
      }
  }
  return false;
}

export function squareIncludes(grid, row, col, value) {
  let square = getSquare(grid, row, col);
  return square.includes(value);
}

export function isCellSafe(grid, row, col, value) {
  return !rowIncludes(grid, row, value) &&
         !columnIncludes(grid, col, value) &&
         !squareIncludes(grid, row, col, value);
}

export function findEmptyCell(grid) {
  for(let i = 0; i < grid.length; ++i) {
    for(let j = 0; j < grid[i].length; ++j) {
      if(grid[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return [null];
}