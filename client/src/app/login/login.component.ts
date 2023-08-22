import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <app-user-form [title]="title" [submitName]="submitName" [routeName]="routeName"></app-user-form>
  `,
  styles: [
  ]
})
export class LoginComponent {

  title: string = "Login";
  submitName: string = "Login";
  routeName: string = "Register";

}
