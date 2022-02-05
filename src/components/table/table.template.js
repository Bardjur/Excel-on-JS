const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `<div class="cell" contenteditable=""></div>`
}

function createCol(el) {
  return `<div class="column">${el}</div>`
}

function createRow(content, index = '') {
  return `
    <div class="row">
      <div class="row-info">${index}</div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `
}

export function createTable(rowsCount = 25) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(getLetter) // my function
      .map(createCol)
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    rows.push(createRow( cells, i + 1))
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
