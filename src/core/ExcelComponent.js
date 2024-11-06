import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
  constructor(node, options = {}) {
    super(node, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribes = [];

    this.prepare();
  }

  toHTML() {
    return '';
  }

  $_emit(eType, ...args) {
    this.emitter.emit(eType, ...args);
  }

  $_subscribe(eType, fn) {
    const unsub = this.emitter.subscribe(eType, fn);
    this.unsubscribes.push(unsub);
  }

  prepare() {}

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();

    this.unsubscribes.forEach(unsub => unsub());
  }

}
