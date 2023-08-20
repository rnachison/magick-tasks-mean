import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-desk',
  template: `
    <div class="footer">
    </div>
  `,
  styles: [
    `.footer {
        width: 100 %;
        height: 11vw;
        position: fixed;
        bottom: 0;
        left: 0;
        z- index: 1;
        background- color: $wood;
    }`
  ]
})
export class FooterDeskComponent {

}
