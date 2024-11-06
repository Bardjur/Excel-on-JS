export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(evtName, ...args){
    if (!Array.isArray(this.listeners[evtName])) { 
      return false;
    }
    this.listeners[evtName].forEach(fn => {
      fn(...args);
    });
    return true;
  }

  subscribe(evtName, fn){
    this.listeners[evtName] = this.listeners[evtName] || [];
    this.listeners[evtName].push(fn);

    return () => {
      this.listeners[evtName] = this.listeners[evtName].filter( eFn => eFn != fn)
    }
  }
}