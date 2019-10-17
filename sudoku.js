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
        console.log("row sum: " + rowTotal);
        if(rowTotal !== 45) return false;

        var colTotal = 0;
        for(var j = 0; j < 9; j++) {
            colTotal += grid[j][i];
        }
        console.log("col sum: " + colTotal);
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

var counter = 0;
function fillGrid(grid) {
    for(var i = 0; i < 81; ++i) {
        var row = Math.floor(i / 9);
        var col = i % 9;
        if(grid[row][col] === 0) {
            shuffle(numberList);
            for(var j = 0; j < 9; j++) {
                console.log(j);
                if(!grid[row].includes(numberList[j])) {
                    var inCol = false;
                    for(var i = 0; i < 9; ++i)
                        if(grid[i][col] == numberList[j]) inCol = true;
                    if(inCol) continue;

                    var square = getGridSquare(grid, row, col);
                    if(!square.includes(numberList[j])) {
                        grid[row][col] = numberList[j];
                        if(checkGrid(grid))
                            return true;
                        else {
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

fillGrid(board);

var cells = document.querySelectorAll("td");

cells.forEach(function(cell, i) {
    var row = Math.floor(i / 9);
    var col = i % 9;
    cell.textContent = board[row][col];
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
                if(cellDom.textContent === cell.textContent) {
                    cellDom.classList.add('number-selected');
                } else {
                    cellDom.classList.remove('number-selected');
                }
                tableRow.children[cell.cellIndex].classList.add('rowcol-selected');
            });
            tableRow.classList.remove('rowcol-selected');
        });
        cell.parentNode.classList.add('rowcol-selected');
    })
});

function onRowColumnHover(cell) {
    var rows = Array.from(cell.parentNode.parentNode.children);
    cell.parentNode.classList.toggle('row-hover');     
    rows.forEach(function(tableRow) {
        tableRow.children[cell.cellIndex].classList.toggle('row-hover');
    });
}
/*
for i in range(0,81):
row=i//9
col=i%9
if grid[row][col]==0:
  shuffle(numberList)      
  for value in numberList:
    #Check that this value has not already be used on this row
    if not(value in grid[row]):
      #Check that this value has not already be used on this column
      if not value in (grid[0][col],grid[1][col],grid[2][col],grid[3][col],grid[4][col],grid[5][col],grid[6][col],grid[7][col],grid[8][col]):
        #Identify which of the 9 squares we are working on
        square=[]
        if row<3:
          if col<3:
            square=[grid[i][0:3] for i in range(0,3)]
          elif col<6:
            square=[grid[i][3:6] for i in range(0,3)]
          else:  
            square=[grid[i][6:9] for i in range(0,3)]
        elif row<6:
          if col<3:
            square=[grid[i][0:3] for i in range(3,6)]
          elif col<6:
            square=[grid[i][3:6] for i in range(3,6)]
          else:  
            square=[grid[i][6:9] for i in range(3,6)]
        else:
          if col<3:
            square=[grid[i][0:3] for i in range(6,9)]
          elif col<6:
            square=[grid[i][3:6] for i in range(6,9)]
          else:  
            square=[grid[i][6:9] for i in range(6,9)]
        #Check that this value has not already be used on this 3x3 square
        if not value in (square[0] + square[1] + square[2]):
          grid[row][col]=value
          if checkGrid(grid):
            return True
          else:
            if fillGrid(grid):
              return True
  break
grid[row][col]=0             */