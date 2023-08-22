import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

  @Input()
  title!: string;

  @Input()
  submitName!: string;

  @Input()
  routeName!: string;

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  userForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  get username() { return this.userForm.get('username')!; }
  get password() { return this.userForm.get('password')!; }
  get id() { return this.userForm.get('id')!; }

  ngOnInit(): void {
    this.initialState.subscribe(user => {
      this.userForm = this.fb.group({
        username: [user.username, [Validators.required]],
        password: user.password,
        id: user._id,
      });
    });

    this.userForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm(): void {
    this.formSubmitted.emit(this.userForm.value);
  }

  reroute(): void {
    if (this.routeName === 'Register') {
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/tasks']);
    }
  }

}
