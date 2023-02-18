import React from "react";

const SudokuGrid = ({ grid, selectedCell, selectCell }) => {
  const selectedNum = grid[selectedCell.x][selectedCell.y];
  const renderCell = (cell, x, y) => {
    let classes =
      x == selectedCell.x && y == selectedCell.y ? "number-selected" : "";
    classes += y == selectedCell.y ? " rowcol-selected" : "";
    classes += cell === selectedNum ? ' number-active' : '';

    return <td key={y} onClick={() => selectCell({x, y})} className={classes}>
      {cell !== 0 ? cell : ""}
    </td>;
  };

  const table = grid.map((row, x) => (
    <tr key={x} className={x == selectedCell.x ? "rowcol-selected" : ""}>
      {row.map((cell, j) => renderCell(cell, x, j))}
    </tr>
  ));

  return (
    <table className="sudoku">
      <tbody>{table}</tbody>
    </table>
  );
};

export default SudokuGrid;
