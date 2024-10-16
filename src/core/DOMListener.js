import { capitalize } from "@core/utils";

export class DOMListener {
  constructor(root, listeners = []) {
    if(!root) throw new Error("The root component must be added");
    this.root = root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]){
        throw new Error(`Method ${method} is not implemented in ${this.name} Component`);
      }

      this.root.on(listener, this[method].bind(this));
    })
  }

  removeDOMListeners(listener, method) {
    this.root.remove(listener, this[method]);
  }
}

function getMethodName(method) {
  return 'on' + capitalize(method);
}