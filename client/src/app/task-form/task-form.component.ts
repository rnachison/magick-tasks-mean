import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  template: `
   <form class="task-form" autocomplete="off" [formGroup]="taskForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="name" formControlName="title" placeholder="Title" required>
       <label for="name">Title</label>
     </div>
 
     <div *ngIf="title.invalid && (title.dirty || title.touched)" class="alert alert-danger">
       <div *ngIf="title.errors?.['required']">
         Title is required.
       </div>
     </div>
 
     <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="dueDate" placeholder="Due Date">
       <label for="dueDate">Due Date</label>
     </div>
 
     <div *ngIf="dueDate.invalid && (dueDate.dirty || dueDate.touched)" class="alert alert-danger">
     </div>
 
    <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="notes" placeholder="Notes">
       <label for="notes">Notes</label>
     </div>
 
     <div *ngIf="notes.invalid && (notes.dirty || notes.touched)" class="alert alert-danger">
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="taskForm.invalid">Add</button>
   </form>
 `,
  styles: [
    `.task-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
  ]
})
export class TaskFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Task> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Task>();

  @Output()
  formSubmitted = new EventEmitter<Task>();

  taskForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get title() { return this.taskForm.get('title')!; }
  get dueDate() { return this.taskForm.get('dueDate')!; }
  get notes() { return this.taskForm.get('notes')!; }

  ngOnInit() {
    this.initialState.subscribe(task => {
      this.taskForm = this.fb.group({
        title: [task.title, [Validators.required]],
        dueDate: task.dueDate,
        notes: task.notes
      });
    });

    this.taskForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.taskForm.value);
  }
}