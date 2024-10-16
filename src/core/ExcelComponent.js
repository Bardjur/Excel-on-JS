import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
  constructor(node, options = {}) {
    super(node, options.listeners);
    this.name = options.name || '';
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
}
