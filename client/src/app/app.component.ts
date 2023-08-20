import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-md app">
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  </div>
 `
})
export class AppComponent { }
