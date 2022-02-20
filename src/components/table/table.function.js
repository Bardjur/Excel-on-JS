import {$} from '@/core/dom'
import {range} from '@/core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function isKey(event, code) {
  return event.keyCode == code
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => {
      acc.push(row + ':' + col)
    })
    return acc
  }, [])
}

export function keyMoveCell(e, $root, selection) {
  e.preventDefault()
  const coord = $(e.target).id(true)
  coord.col--
  const cell = $root.find(`[data-id="${coord.row}:${coord.col}"]`)
  if (cell.$el) {
    selection.select(cell)
  }
}
