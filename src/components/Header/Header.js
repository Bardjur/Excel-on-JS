import { ExcelComponent } from "@core/ExcelComponent";


export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options){
    super($root, {
      name: 'Header',
      ...options
    })
  }

  toHTML() {
    return `
      <input type="text" class="input" value="Нова таблиця">

      <div>
        <button class="" type="button">
          <span class="material-symbols-outlined">
            delete
          </span>
        </button>

        <button class="" type="button">
          <span class="material-symbols-outlined">
            exit_to_app
          </span>
        </button>
      </div>
    `;
  }
}
