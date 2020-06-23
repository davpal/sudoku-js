import { renderDomBoard, initBoardEvents, initMenuEvents } from './dom';
import { EASY, SudokuGrid, VERY_HARD } from './grid';

const sudoku = new SudokuGrid();
const onNewGame = () => {
    sudoku.reset();
    sudoku.fill();
    sudoku.prepare(10);
    return sudoku;
};

const onSolve = () => {
    console.log('solve');
    sudoku.fill();
    return sudoku;
}

onNewGame();

let board = renderDomBoard(sudoku.grid);
initBoardEvents(board, () => sudoku.setCell(0, 0, 1));
initMenuEvents(onNewGame, onSolve);