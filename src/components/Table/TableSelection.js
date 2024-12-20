export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  selectGroup($el) {
    this.group.push($el);
    $el.addClass(TableSelection.className);
  }

  selectRange($els) {
    this.clear();
    this.group = $els;
    $els.forEach($el => $el.addClass(TableSelection.className));
  }

  clear() {
    this.group.forEach(
      $el => {$el.removeClass(TableSelection.className);}
    );
    this.group = [];
  }
}