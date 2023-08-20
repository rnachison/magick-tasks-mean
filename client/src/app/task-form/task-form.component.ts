import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Task> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Task>();

  @Output()
  formSubmitted = new EventEmitter<Task>();

  @Output()
  taskDiscarded = new EventEmitter();

  taskForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get title() { return this.taskForm.get('title')!; }
  get dueDate() { return this.taskForm.get('dueDate')!; }
  get notes() { return this.taskForm.get('notes')!; }
  get id() { return this.taskForm.get('id')!; }

  ngOnInit(): void {
    this.initialState.subscribe(task => {
      this.taskForm = this.fb.group({
        title: [task.title, [Validators.required]],
        dueDate: task.dueDate,
        notes: task.notes,
        id: task._id
      });
    });

    this.taskForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm(): void {
    this.formSubmitted.emit(this.taskForm.value);
  }

  discardTask(): void {
    let isConfirm = confirm('Discarding will permanently destroy task');
    if (!isConfirm) {
      return;
    }
    this.taskDiscarded.emit(this.id);
  }
}