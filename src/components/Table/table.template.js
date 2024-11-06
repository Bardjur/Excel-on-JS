const CODES = {
  A: 65,
  Z: 90
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = Array(colsCount)
    .fill('')
    .map( (_, idx) => createCol(toChar(idx), idx + 1))
    .join('');

  


  rows.push(createRow('', cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = Array(colsCount)
    .fill('')
    //.map( (_, col) => createCel(row+1, col + 1))
    .map(createCel(row))
    .join('');

    rows.push(createRow(row+1, cells ));
  }

  return rows.join('');
}


function createRow(number = '', content ) {
  return `
    <div class="row" ${number ? 'data-type="resizable"' : ''}>
      <div class="row-info">
        ${number}
        ${number 
          ? '<div class="row-resize" data-resize="row"></div>' 
          : ''
        }
      </div>

      <div class="row-data">${content}</div>
    </div>
  `;
}

function createCol(char, colNum) {
  return `
    <div class="column" data-type="resizable" data-col_num="${colNum}">
      ${char}

      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createCel(row) {
  return function(_, col){
    return `
      <div class="cell" 
        contenteditable 
        data-col_num="${col+1}"
        data-id="${row+1}:${col+1}"
        data-type="cell"
      ></div>
    `;
  }
}

function toChar(number) {
  return String.fromCharCode(CODES.A + number);
}

