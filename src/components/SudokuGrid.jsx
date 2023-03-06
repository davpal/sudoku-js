import React from "react";

const SudokuGrid = ({ grid, onCellClick, selectedNumber }) => {
  const renderCell = (cell, x, y) => {
    let classes =
      selectedNumber > 0 && cell === selectedNumber ? "number-selected" : "";

    return <td key={y} onClick={() => onCellClick(x, y, selectedNumber)} className={classes}>
      {cell !== 0 ? cell : ""}
    </td>;
  };

  const table = grid.map((row, x) => (
    <tr key={x}>
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
