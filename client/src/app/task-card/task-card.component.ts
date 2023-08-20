import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';
import { Symbols } from '../symbols';
import { TaskService } from '../task.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input()
  task!: Task;

  @Output()
  discarded = new EventEmitter();

  taskForm = new BehaviorSubject({});

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    this.taskForm.next(this.task);
  }

  getImagePath() {
    let index = this.task.symbol ? this.task.symbol : 0;
    return `assets/${Symbols.list[index]}.svg`;
  }

  onTaskDiscarded() {
    this.discarded.emit(this.task._id || '');
  }

  editTask(task: Task) {
    this.taskService.updateTask(this.task._id || '', task)
      .subscribe({
        error: (error) => {
          alert('Failed to update task');
          console.error(error);
        }
      })
  }
}
