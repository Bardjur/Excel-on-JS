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

  const cell = Array(colsCount)
    .fill('')
    .map( (_, idx) => createCel(idx + 1))
    .join('');


  rows.push(createRow('', cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i+1, cell ));
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

function createCel(celNum) {
  return `
    <div class="cell" contenteditable data-col_num="${celNum}">
    </div>
  `;
}

function toChar(number) {
  return String.fromCharCode(CODES.A + number);
}

