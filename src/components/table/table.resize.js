import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const type = event.target.dataset.resize
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  let value

  if (type === 'col') {
    const tblHeight = $root.$el.clientHeight
    $resizer.css({height: tblHeight + 'px'})
  } else {
    const tblWidth = $root.$el.clientWidth
    $resizer.css({width: tblWidth + 'px'})
  }

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = delta + coords.width
      $resizer.css({left: value + 'px'})
    } else {
      const delta = e.clientY - coords.bottom
      value = delta + coords.height
      $resizer.css({top: value + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $resizer.css({
        height: '',
        left: ''
      })
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(cell => cell.style.width = value + 'px')
    } else {
      $resizer.css({
        width: '',
        top: ''
      })
      $parent.css({height: value + 'px'})
    }
  }
}
