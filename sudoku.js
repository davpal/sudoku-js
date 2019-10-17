"use strict";

var board = [];
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);

var numberList = [1,2,3,4,5,6,7,8,9];

function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function checkGrid(grid) {
    for(var i = 0; i < 9; ++i)
        for(var j = 0; j < 9; ++j) 
            if(grid[i][j] === 0) return false;
    return true;
}

function validGrid(grid) {
    for(var i = 0; i < 9; ++i) {
        var rowTotal = grid[i].reduce(function(a, b) {
            return a + b;
        }, 0);
        if(rowTotal !== 45) return false;

        var colTotal = 0;
        for(var j = 0; j < 9; j++) {
            colTotal += grid[j][i];
        }
        if(colTotal !== 45) return false;
    }

    for(var k = 0; k < 3; ++k)
        for(var l = 0; l < 3; ++l) {
            for(var i = 0; i < 3; ++i) {
                var squareSum = 0;
                for(var j = 0; j < 3; j++) {
                    squareSum += grid[i*k][j*l];
                }
            }
            if(squareSum !== 45) return false;
        }

    return true;
}

function getGridSquare(grid, row, col) {
    var square = [];

    var si = Math.floor(row / 3) * 3;
    var sj = Math.floor(col / 3) * 3;
 
    for(var i = si; i < si + 3; ++i) {
        for(var j = sj; j < sj + 3; ++j) {
            square.push(grid[i][j]);
        }
    }

    return square;
}

function fillGrid(grid) {
    for(var i = 0; i < 81; ++i) {
        var row = Math.floor(i / 9);
        var col = i % 9;
        if(grid[row][col] === 0) {
            shuffle(numberList);
            for(var j = 0; j < 9; j++) {
                if(!grid[row].includes(numberList[j])) {
                    var inCol = false;
                    for(var i = 0; i < 9; ++i)
                        if(grid[i][col] == numberList[j]) inCol = true;
                    if(inCol) continue;

                    var square = getGridSquare(grid, row, col);
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

var counter = 0;
function solveGrid(grid) {
    for(var i = 0; i < 81; ++i) {
        var row = Math.floor(i / 9);
        var col = i % 9;
        if(grid[row][col] === 0) {
            for(var j = 1; j <= 9; j++) {
                if(!grid[row].includes(j)) {
                    var inCol = false;
                    for(var i = 0; i < 9; ++i)
                        if(grid[i][col] == j) inCol = true;
                    if(inCol) continue;

                    var square = getGridSquare(grid, row, col);
                    if(!square.includes(j)) {
                        grid[row][col] = j;
                        if(checkGrid(grid)) {
                            ++counter;
                            break;
                        } else {
                            if(solveGrid(grid))
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

function prepareGrid(grid, attempts) {
    while(attempts) {
        var row = Math.floor(Math.random() * 9);
        var col = Math.floor(Math.random() * 9);

        while(grid[row][col] == 0) {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);    
        }
        var backup = grid[row][col];
        grid[row][col] = 0;

        var gridCopy = grid.slice();

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
var cc = board.slice();
solveGrid(cc);

var cells = document.querySelectorAll("td");

cells.forEach(function(cell, i) {
    var row = Math.floor(i / 9);
    var col = i % 9;
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
        var rows = Array.from(cell.parentNode.parentNode.children);
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
        var e = event ? event : window.event;
        e.preventDefault();
        var code = e.which ? e.which : e.keyCode;
        if(code > 0x30 && code <= 0x39) {
            cell.textContent = String.fromCharCode(code);
            var rows = Array.from(cell.parentNode.parentNode.children);
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
    var rows = Array.from(cell.parentNode.parentNode.children);
    cell.parentNode.classList.toggle('row-hover');     
    rows.forEach(function(tableRow) {
        tableRow.children[cell.cellIndex].classList.toggle('row-hover');
    });
}

var newgame = document.querySelector("#newgame");
var solve = document.querySelector("#solve");
var gamecontrol = document.querySelector("#game-control");
newgame.addEventListener('click', function() {
    newgame.style.display = 'none';
    gamecontrol.style.display = 'block';
});

solve.addEventListener('click', function() {
    solveGrid(board);
    cells.forEach(function(cell, i) {
        var row = Math.floor(i / 9);
        var col = i % 9;
        if(board[row][col] != 0) {
            cell.textContent = board[row][col];
        }
        if(Array.from(cell.classList).includes('number-selected')) {
            cell.click();
        }
    });
});

Array.from(gamecontrol.children).forEach(function(button) {
    var attempts = 5;
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
            var row = Math.floor(i / 9);
            var col = i % 9;
            if(board[row][col] != 0) {
                cell.textContent = board[row][col];
            }
            if(Array.from(cell.classList).includes('number-selected')) {
                cell.click();
            }
        });
        newgame.style.display = 'inline-block';
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