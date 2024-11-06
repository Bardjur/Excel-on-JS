import { ExcelComponent } from "@core/ExcelComponent";
import { createFormula } from "./formula.template";

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input','keydown'],
      ...options
    })
  }

  toHTML() { 
    return createFormula();
  }

  init() {
    super.init()

    this.$formula = this.root.find('#formula');
    
    this.$_subscribe('table:input', $cell =>{
      this.$formula.text($cell.text());
    });

    this.$_subscribe('table:select', $cell => {
      console.log($cell);
      this.$formula.text($cell.text());
    })
  }
  


  onInput(e) {
    const text = e.target.textContent.trim();
    this.$_emit('formula:input', text);
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab'];

    if  (keys.includes(e.key)){
      e.preventDefault();
      this.$_emit('formula:keydown');
    }
  }
}
