class Dom {
  constructor(selector){
    this.node = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  }

  html(data) {
    if (typeof data === 'string') {
      this.node.innerHTML = data;
      return this
    }
    return this.node.outerHTML
  }
  
  clear() {
    this.html('')
    return this
  }

  on(event, method) {
    this.node.addEventListener(event, method);
  }

  off(event, method) {
    this.node.removeEventListener(event, method);
  }

  append(el) {
    if (el instanceof Dom) {
      el = el.node
    }
    
    if(Element.prototype.append) {
      this.node.append(el);
    } else {
      this.node.appendChild(el);
    }
    
    return this
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, className = '') => {
  const el = document.createElement(tagName);
  if(className) {
    el.classList.add(className);
  }
  return $(el);
}
