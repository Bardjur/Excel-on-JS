import { $ } from "../../core/Dom";

export function resizeHandler(e, $root) {
  const resizeType = e.target.dataset.resize;
  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const {right, width, bottom, height} = $parent.getCoords();
  const colNumber = $parent.data.col_num;
  const rowsCol = $root.findAll(`[data-col_num="${colNumber}"]`);
  let colWidth = null;

  $resizer.css({opacity:1});
  if (resizeType === "col") {
    $resizer.css({height : $root.$el.clientHeight + 'px'});
  } else {
    $resizer.css({width : $root.$el.clientWidth + 'px'});
  }

  document.onmousemove = evt => {
    if (resizeType === "col") {
      colWidth = evt.clientX - right + width;
      $parent.css({width : colWidth + "px"});
    } else {
      const rowHeight = evt.clientY - bottom + height;
      $parent.css({height : rowHeight + "px"});
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    rowsCol.forEach( col => {
      col.style.width = colWidth + "px";
    });

    $resizer.css({
      height : "",
      width : "",
      opacity : "",
    });
  }
}