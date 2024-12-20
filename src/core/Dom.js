class Dom {
  constructor(selector){
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }

  html(data) {
    if (typeof data === 'string') {
      this.$el.innerHTML = data;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(data){
    console.log(this);
    if (typeof data === 'string') {
      this.$el.textContent = data;
      return this;
    }

    if(this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();;
  }
  
  clear() {
    this.html('');
    return this;
  }

  on(event, method) {
    this.$el.addEventListener(event, method);
  }

  off(event, method) {
    this.$el.removeEventListener(event, method);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    
    if(Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  get data() {
    return this.$el.dataset;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  css(styles = {}) {
    const keys = Object.keys(styles);

    keys.forEach(key => {
      this.$el.style[key] = styles[key];
    });
  }

  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':')
      return {
        row: +row,
        col: +col
      }
    }

    return this.data.id;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
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
