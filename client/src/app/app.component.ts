import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-md app">
    <div class="container">
        <router-outlet></router-outlet>
        <app-footer-candles></app-footer-candles>
        <app-footer-desk></app-footer-desk>
    </div>
  </div>
 `
})
export class AppComponent { }
