var cells = document.querySelectorAll("td");

cells.forEach(function(cell) {
    cell.textContent = Math.floor(Math.random() * 10);
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