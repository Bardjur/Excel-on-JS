import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }
  // returns the template of the component
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListiners()
  }

  destroy() {
    this.removeDOMListiners()
    console.log('deleted');
  }
}
