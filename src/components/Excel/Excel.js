import { $ } from "@core/Dom";
import { Emitter } from "@core/Emitter";

export class Excel {
  constructor(selector, option) {
    this.El = $(selector);
    this.components = option?.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
    }

    this.components = this.components.map( Component => {
      const el = $.create('div', Component.className);
      const component = new Component(el, componentOptions);
      el.html(component.toHTML());

      root.append(el);
      return component;
    });
    return root;
  }

  render() {
    this.El.append(this.getRoot());

    this.components.forEach(component => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}
