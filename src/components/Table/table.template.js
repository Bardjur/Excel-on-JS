const CODES = {
  A: 65,
  Z: 90
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = Array(colsCount)
    .fill('')
    .map( (_, idx) => createCol(toChar(idx)))
    .join('');

  const cell = Array(colsCount)
    .fill('')
    .map( () => createCel())
    .join('');


  rows.push(createRow('', cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i+1, cell ));
  }

  return rows.join('');
}


function createRow(number = '', content ) {
  return `
    <div class="row">
      <div class="row-info">${number}</div>

      <div class="row-data">${content}</div>
    </div>
  `;
}

function createCol(char) {
  return `
    <div class="column">${char}</div>
  `;
}

function createCel() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function toChar(number) {
  return String.fromCharCode(CODES.A + number);
}

