import ReactDOM from "react-dom/client";
import "./sudoku";
import "../assets/style.css";

import { useEffect, useState } from "react";
import { getSquare, isCellSafe, findEmptyCell } from "./grid.utils";
import SudokuGrid from './SudokuGrid';

function createEmptyGrid() {
  return Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));
}

function fill(grid) {
  let [row, col] = findEmptyCell(grid);
  if (row === null) return true;

  for (let i = 1; i <= 9; i++) {
    const randNumber = (Math.random() * 9 + 1) >> 0;
    if (isCellSafe(grid, row, col, randNumber)) {
      grid[row][col] = randNumber;

      if (fill(grid)) {
        return true;
      }
    }
  }

  grid[row][col] = 0;
  return false;
}

function solve(grid) {
  let [row, col] = findEmptyCell(grid);
  if (row === null) return true;

  for (let i = 1; i <= 9; i++) {
    if (isCellSafe(grid, row, col, i)) {
      grid[row][col] = i;

      if (solve(grid)) {
        return true;
      }
    }
  }

  grid[row][col] = 0;
  return false;
}

function prepare(grid, attempts) {
  while (attempts--) {
    let row = (Math.random() * 9) >> 0;
    let col = (Math.random() * 9) >> 0;

    while (grid[row][col] == 0) {
      row = (Math.random() * 9) >> 0;
      col = (Math.random() * 9) >> 0;
    }

    grid[row][col] = 0;
  }
}

const App = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [gameReady, setGameReady] = useState(false);
  const [selectedCell, selectCell] = useState({ x: 0, y: 0 });

  const onNewGame = (difficulty) => {
    const newGrid = createEmptyGrid();
    fill(newGrid);
    prepare(newGrid, difficulty);
    setGrid(newGrid);
    setGameReady(false);
  };

  const onSolve = () => {
    const solvedGrid = grid.map((row) => [...row]);
    solve(solvedGrid);
    setGrid(solvedGrid);
  };

  useEffect(() => onNewGame(), []);

  const difficultyButtons = [
    { name: "easy", value: 10 },
    { name: "medium", value: 30 },
    { name: "hard", value: 50 },
  ].map((b) => <button key={b.name} onClick={() => onNewGame(b.value)}>{b.name}</button>);

  return (
    <>
      <header>
        <div className="container">
          <h1>Sudoku.js</h1>
          { !gameReady ? 
          <div className="nav">
            <button id="newgame" onClick={() => setGameReady(true)}>
              New Game
            </button>
            <button id="solve" onClick={onSolve}>
              Solve
            </button>
          </div> :
          <div id="game-control">{difficultyButtons}</div> }
        </div>
      </header>
      <div className="container">
        <SudokuGrid grid={grid} selectedCell={selectedCell} selectCell={selectCell} />
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
