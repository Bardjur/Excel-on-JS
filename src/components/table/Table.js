import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@/core/dom'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {isCell, isKey,
  keyMoveCell, matrix, shouldResize} from './table.function'
import {TableSelection} from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: Table,
      listeners: ['mousedown', 'keydown']
    })
  }

  toHTML() {
    return createTable(60)
  }

  prepare() {
    this.selection = new TableSelection(this.$root)
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="1:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cels = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cels)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(e) {
    if (isKey(e, 40) && isCell(e)) {
      keyMoveCell(e, this.$root, this.selection)
    }
  }
}
