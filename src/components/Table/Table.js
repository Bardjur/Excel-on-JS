import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "../../core/Dom";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isCell, matrix, setIdToEvent, shouldResize } from "./table.function";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init()

    this.selectCell(this.root.find('[data-id="1:1"]'));
    
    this.$_subscribe('formula:input', (text)=> {
      this.selection.current.text(text)
    });

    this.$_subscribe('formula:keydown', () => {
      this.selection.current.focus();
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$_emit('table:select', $cell)
  }

  onMousedown (e) {
    if(shouldResize(e)) {
      resizeHandler(e, this.root);
    } else if (isCell(e)) {
      const $el = $(e.target);

      if (e.ctrlKey){
        this.selection.selectGroup($el);
      } else if (e.shiftKey){
        const $cells = matrix($el, this.selection.current)
          .map(id => this.root.find(`[data-id="${id}"]`));

        this.selection.selectRange($cells);
      } else {
        //this.selection.select($el);
        this.selectCell($el);
      }
    }
  }

  onInput(e){
    this.$_emit('table:input', $(e.target))
  }



  onKeydown(e) {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Tab", "Enter"];
    
    if (keys.includes(e.key) && !e.shiftKey) {
      e.preventDefault();

      const id = setIdToEvent(e.key, this.selection.current.id(true));
      const $cell = this.root.find(`[data-id="${id}"]`);

      if ($cell.$el) { 
        this.selectCell($cell);
      }
    } 
  }
}
