import { renderDomBoard, initBoardEvents } from './dom';
import { SudokuGrid } from './grid';


const sudoku = new SudokuGrid();
sudoku.fill();

let board = renderDomBoard(sudoku.grid);
initBoardEvents(board, () => sudoku.setCell(0, 0, 1));