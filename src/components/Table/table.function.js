import { range } from "../../core/utils";

export function shouldResize(e) {
  return e.target.dataset.resize;
}

export function isCell(e) {
  return e.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, []);
}

export function setIdToEvent(key, {row, col}) {
  row = key === "ArrowUp"
    ? row - 1
    : key === "ArrowDown" || key === "Enter"
    ? row + 1
    : row;
  col = key === "ArrowLeft"
    ? col - 1
    : key === "ArrowRight" || key === "Tab"
    ? col + 1
    : col;

  return `${row}:${col}`
}