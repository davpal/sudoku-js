import { initDomBoard } from './dom';
import { shuffleArray } from './utils';
import { createEmptyGrid,
         isGridSolved } from './grid';

initDomBoard();

let board = createEmptyGrid();

let numberList = [1,2,3,4,5,6,7,8,9];

function checkGrid(grid) {
    for(let i = 0; i < 9; ++i)
        for(let j = 0; j < 9; ++j) 
            if(grid[i][j] === 0) return false;
    return true;
}

function getGridSquare(grid, row, col) {
    let square = [];

    let si = Math.floor(row / 3) * 3;
    let sj = Math.floor(col / 3) * 3;
 
    for(let i = si; i < si + 3; ++i) {
        for(let j = sj; j < sj + 3; ++j) {
            square.push(grid[i][j]);
        }
    }

    return square;
}

function fillGrid(grid) {
    let row, col;
    for(let i = 0; i < 81; ++i) {
        row = Math.floor(i / 9);
        col = i % 9;
        if(grid[row][col] === 0) {
            shuffleArray(numberList);
            for(let j = 0; j < 9; j++) {
                if(!grid[row].includes(numberList[j])) {
                    let inCol = false;
                    for(let i = 0; i < 9; ++i)
                        if(grid[i][col] == numberList[j]) inCol = true;
                    if(inCol) continue;

                    let square = getGridSquare(grid, row, col);
                    if(!square.includes(numberList[j])) {
                        grid[row][col] = numberList[j];
                        if(checkGrid(grid)) {
                            return true;
                        } else {
                            if(fillGrid(grid))
                                return true;
                        }
                    }
                }
            }
            break;
        }
    }
    grid[row][col] = 0;
}

function columnContains(grid, col, value) {
    for(let i = 0; i < grid.length; ++i) {
        if(grid[i][col] === value) {
            return true;
        }
    }
    return false;
}



function prepareGrid(grid, attempts) {
    while(attempts) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        while(grid[row][col] == 0) {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);    
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

fillGrid(board);
prepareGrid(board, 5);

let cells = document.querySelectorAll("td");

cells.forEach(function(cell, i) {
    let row = Math.floor(i / 9);
    let col = i % 9;
    if(board[row][col] != 0) {
        cell.textContent = board[row][col];
    }
    cell.addEventListener('mouseover', function(event) {
        onRowColumnHover(cell);
    });
    cell.addEventListener('mouseleave', function() {
        onRowColumnHover(cell);
    });
    cell.addEventListener('click', function(event) {
        let rows = Array.from(cell.parentNode.parentNode.children);
        rows.forEach(function(tableRow) {
            Array.from(tableRow.children).forEach(function(cellDom) {
                cellDom.classList.remove('rowcol-selected');
                if(cell.textContent != '' && cellDom.textContent === cell.textContent) {
                    cellDom.classList.add('number-selected');
                } else {
                    cellDom.classList.remove('number-selected');
                    cellDom.classList.remove('number-active');
                }
                tableRow.children[cell.cellIndex].classList.add('rowcol-selected');
            });
            tableRow.classList.remove('rowcol-selected');
        });
        cell.parentNode.classList.add('rowcol-selected');
        cell.classList.add('number-active');
        if(board[row][col] == 0) {
            cell.contentEditable = 'true';
            cell.focus();
        }
    });
    cell.addEventListener('keypress', function(event) {
        let e = event ? event : window.event;
        e.preventDefault();
        let code = e.which ? e.which : e.keyCode;
        if(code > 0x30 && code <= 0x39) {
            cell.textContent = String.fromCharCode(code);
            let rows = Array.from(cell.parentNode.parentNode.children);
            rows.forEach(function(tableRow) {
                Array.from(tableRow.children).forEach(function(cellDom) {
                    cellDom.classList.remove('rowcol-selected');
                    if(cell.textContent != '' && cellDom.textContent === cell.textContent) {
                        cellDom.classList.add('number-selected');
                    } else {
                        cellDom.classList.remove('number-selected');
                    }
                    tableRow.children[cell.cellIndex].classList.add('rowcol-selected');
                });
                tableRow.classList.remove('rowcol-selected');
            });
        }
    });
});

function onRowColumnHover(cell) {
    let rows = Array.from(cell.parentNode.parentNode.children);
    cell.parentNode.classList.toggle('row-hover');     
    rows.forEach(function(tableRow) {
        tableRow.children[cell.cellIndex].classList.toggle('row-hover');
    });
}

let newgame = document.querySelector("#newgame");
let solve = document.querySelector("#solve");
let gamecontrol = document.querySelector("#game-control");
newgame.addEventListener('click', function() {
    newgame.style.display = 'none';
    solve.style.display = 'none';
    gamecontrol.style.display = 'block';
});

solve.addEventListener('click', function() {
    fillGrid(board);
    cells.forEach(function(cell, i) {
        let row = Math.floor(i / 9);
        let col = i % 9;
        if(board[row][col] != 0) {
            cell.textContent = board[row][col];
        }
        if(Array.from(cell.classList).includes('number-selected')) {
            cell.click();
        }
    });
});

Array.from(gamecontrol.children).forEach(function(button) {
    let attempts = 5;
    switch(button.id) {
        case 'easy':
            attempts = 5;
            break;
        case 'medium':
            attempts = 10;
            break;
        case 'hard':
            attempts = 20;
            break;
    }
    button.addEventListener('click', function(event) {
        clearGrid();
        fillGrid(board);
        prepareGrid(board, attempts);
        cells.forEach(function(cell, i) {
            let row = Math.floor(i / 9);
            let col = i % 9;
            if(board[row][col] != 0) {
                cell.textContent = board[row][col];
            }
            if(Array.from(cell.classList).includes('number-selected')) {
                cell.click();
            }
        });
        newgame.style.display = 'inline-block';
        solve.style.display = 'inline-block';
        gamecontrol.style.display = 'none';
    });
})


function clearGrid() {
    board = [];
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    cells.forEach(function(cell) {
        cell.textContent = '';
    });
}