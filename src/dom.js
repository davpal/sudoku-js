const TABLE_CLASS = '.sudoku';

export function initDomBoard() {
    let sudokuTable = document.querySelector(TABLE_CLASS);
    let rowHtml = '<tr>' + '<td></td>'.repeat(9) + '</tr>';
    let tableHtml = '<tbody>' + rowHtml.repeat(9);
    sudokuTable.innerHTML = tableHtml;
}