import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  template: `
    <app-user-form [title]="title" [submitName]="submitName" [routeName]="routeName"></app-user-form>
  `,
  styles: [
  ]
})
export class RegisterComponent {

  title: string = "Please Register";
  submitName: string = "Register";
  routeName: string = "Cancel";

}
