const TABLE_CLASS = '.sudoku';

export function renderDomBoard(grid) {
  const sudokuTable = document.querySelector(TABLE_CLASS);
  let tableHtml = '<tbody>';
  for(let i = 0; i < 9; i++) {
    tableHtml += '<tr>';
    for(let j = 0; j < 9; j++) {
      tableHtml += '<td>' + grid[i][j] + '</td>';
    }
    tableHtml += '</tr>';
  }
  tableHtml += '</tbody>';
  sudokuTable.innerHTML = tableHtml;
  
  return sudokuTable;
}

export function initBoardEvents(board, onCellInput) {
  const cells = board.querySelectorAll('td');

  for(let c of cells) {
    c.addEventListener('click', 
      (e) => onCellClick(e.target.parentElement.rowIndex, e.target.cellIndex, e));
  }

  document.addEventListener('keydown', (e) => onKeyDown(e, onCellInput));

  initMenuEvents();
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = 'block';
}

function initMenuEvents() {
  let newGame = document.querySelector("#newgame");
  let solve = document.querySelector("#solve");
  let gameControl = document.querySelector("#game-control");
  newgame.addEventListener('click', () => {
    hide(newGame);
    hide(solve);
    show(gameControl)
  });

// solve.addEventListener('click', function() {
//     fillGrid(board);
//     cells.forEach(function(cell, i) {
//         let row = Math.floor(i / 9);
//         let col = i % 9;
//         if(board[row][col] != 0) {
//             cell.textContent = board[row][col];
//         }
//         if(Array.from(cell.classList).includes('number-selected')) {
//             cell.click();
//         }
//     });
// });

// Array.from(gamecontrol.children).forEach(function(button) {
//     let attempts = 5;
//     switch(button.id) {
//         case 'easy':
//             attempts = 5;
//             break;
//         case 'medium':
//             attempts = 10;
//             break;
//         case 'hard':
//             attempts = 20;
//             break;
//     }
//     button.addEventListener('click', function(event) {
//         clearGrid();
//         fillGrid(board);
//         prepareGrid(board, attempts);
//         cells.forEach(function(cell, i) {
//             let row = Math.floor(i / 9);
//             let col = i % 9;
//             if(board[row][col] != 0) {
//                 cell.textContent = board[row][col];
//             }
//             if(Array.from(cell.classList).includes('number-selected')) {
//                 cell.click();
//             }
//         });
//         newgame.style.display = 'inline-block';
//         solve.style.display = 'inline-block';
//         gamecontrol.style.display = 'none';
//     });
// })

}

let selectedCell = null;
function onCellClick(x, y, e) {
  selectCell(e.target);

  // TODO: highlight clicked number
  // TODO: highlight column
  // TODO: highlight row
  // TODO: enable edit mode
}

function selectCell(c) {
  if(selectedCell) {
    selectedCell.classList.toggle('number-active');
  }

  c.classList.toggle('number-active');
  selectedCell = c;
}

function onKeyDown(e, onCellInput) {
  e.preventDefault();
  console.log(e.keyCode);
  const code = e.which ? e.which : e.keyCode;
  if(!selectedCell || (code !== 32 && !isNumberKey(code))) return;
  let conflictCell = onCellInput(0, 0, 1)
  selectedCell.textContent = String.fromCharCode(code);
}

function isNumberKey(code) {
  return (code >= 48 && code <= 57);
}






// let newgame = document.querySelector("#newgame");
// let solve = document.querySelector("#solve");
// let gamecontrol = document.querySelector("#game-control");
// newgame.addEventListener('click', function() {
//     newgame.style.display = 'none';
//     solve.style.display = 'none';
//     gamecontrol.style.display = 'block';
// });

// solve.addEventListener('click', function() {
//     fillGrid(board);
//     cells.forEach(function(cell, i) {
//         let row = Math.floor(i / 9);
//         let col = i % 9;
//         if(board[row][col] != 0) {
//             cell.textContent = board[row][col];
//         }
//         if(Array.from(cell.classList).includes('number-selected')) {
//             cell.click();
//         }
//     });
// });

// Array.from(gamecontrol.children).forEach(function(button) {
//     let attempts = 5;
//     switch(button.id) {
//         case 'easy':
//             attempts = 5;
//             break;
//         case 'medium':
//             attempts = 10;
//             break;
//         case 'hard':
//             attempts = 20;
//             break;
//     }
//     button.addEventListener('click', function(event) {
//         clearGrid();
//         fillGrid(board);
//         prepareGrid(board, attempts);
//         cells.forEach(function(cell, i) {
//             let row = Math.floor(i / 9);
//             let col = i % 9;
//             if(board[row][col] != 0) {
//                 cell.textContent = board[row][col];
//             }
//             if(Array.from(cell.classList).includes('number-selected')) {
//                 cell.click();
//             }
//         });
//         newgame.style.display = 'inline-block';
//         solve.style.display = 'inline-block';
//         gamecontrol.style.display = 'none';
//     });
// })
