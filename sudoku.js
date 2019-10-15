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
    for (let i = a.length - 1; i > 0; i--) {
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

    console.log('what');
    return true;
}

var counter = 0;
function fillGrid(grid) {
    console.log(counter + " =".repeat(counter++) + "> fillGrid!");
    for(var i = 0; i < 81; ++i) {
        var row = Math.floor(i / 9);
        var col = i % 9;
        if(grid[row][col] == 0) {
            shuffle(numberList);
            console.log(numberList);
            for(j = 0; j < 9; j++) {
                if(!grid[row].includes(numberList[j])) {
                    var inCol = false;
                    for(var i = 0; i < 9; ++i)
                        if(grid[i][col] == numberList[j]) inCol = true;
                    if(inCol) continue;

                    var square = [];
                    if(row < 3) {
                        if(col < 3) {
                            for(var i = 0; i < 3; ++i)
                                square.push(grid[i].slice(0, 3));
                        } else if(col < 6) {
                            for(var i = 0; i < 3; ++i)
                                square.push(grid[i].slice(3, 6));
                        } else {
                            for(var i = 0; i < 3; ++i)
                                square.push(grid[i].slice(6, 9));
                        }
                    } else if(row < 6) {
                        if(col < 3) {
                            for(var i = 3; i < 6; ++i)
                                square.push(grid[i].slice(0, 3));
                        } else if(col < 6) {
                            for(var i = 3; i < 6; ++i)
                                square.push(grid[i].slice(3, 6));
                        } else {
                            for(var i = 3; i < 6; ++i)
                                square.push(grid[i].slice(6, 9));
                        }
                    } else {
                        if(col < 3) {
                            for(var i = 6; i < 9; ++i)
                                square.push(grid[i].slice(0, 3));
                        } else if(col < 6) {
                            for(var i = 6; i < 9; ++i)
                                square.push(grid[i].slice(3, 6));
                        } else {
                            for(var i = 6; i < 9; ++i)
                                square.push(grid[i].slice(6, 9));
                        }
                    }
                    if(!square[0].includes(numberList[j]) && !square[1].includes(numberList[j]) && !square[2].includes(numberList[j])) {
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
    console.log(counter + " =".repeat(counter++) + "> fillGrid!");
}

fillGrid(board);

var cells = document.querySelectorAll("td");

cells.forEach(function(cell, i) {
    var row = Math.floor(i / 9);
    var col = i % 9;
    cell.textContent = board[row][col] != 0 ? board[row][col] : '';
    cell.addEventListener('mouseover', function(event) {
        onRowColumnHover(cell);
    });
    cell.addEventListener('mouseleave', function() {
        onRowColumnHover(cell);
    });
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