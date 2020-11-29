import { ExcelComponent } from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input']
        })
    }
    static className = 'excel__formula'

    onInput(event) {
    }

    toHTML() {
        return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
    }
}
