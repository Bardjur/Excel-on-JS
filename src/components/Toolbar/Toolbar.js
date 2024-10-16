import { ExcelComponent } from "@core/ExcelComponent";


export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  toHTML() {
    return `
      <button class="" type="button">
        <span class="material-symbols-outlined">
          format_align_left
        </span>
      </button>

      <button class="" type="button">
        <span class="material-symbols-outlined">
          format_align_center
        </span>
      </button>
      
      <button class="" type="button">
        <span class="material-symbols-outlined">
          format_align_right
        </span>
      </button>

      <button class="" type="button">
        <span class="material-symbols-outlined">
          format_bold
        </span>
      </button>
      
      <button class="" type="button">
        <span class="material-symbols-outlined">
          format_italic
        </span>
      </button>

      <button class="" type="button">
        <span class="material-symbols-outlined">
          <span class="material-symbols-outlined">
            format_underlined
          </span>
        </span>
      </button>
    `;
  }
}
