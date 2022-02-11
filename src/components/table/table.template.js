const CODES = {
  A: 65,
  Z: 90
}

function createCell(_, idx) {
  return `<div class="cell" contenteditable="" data-col="${idx}"></div>`
}

function createCol(el, idx) {
  return `<div class="column" data-type="resizable" data-col="${idx}">
      ${el}
      <div class="col-resize" data-resize="col" ></div>
    </div>`
}

function createRow(index, content) {
  const resizer = index ?
    '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resizer}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(getLetter) // my function
      .map(createCol)
      .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}

function getLetter(_, num) {
  let letter = ''
  if (num <= 25) {
    letter = String.fromCharCode(65 + num)
  } else {
    letter = String.fromCharCode(65) + getLetter(num - 26)
  }
  return letter
}
