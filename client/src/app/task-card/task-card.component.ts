import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';
import { Symbols } from '../symbols';
import { TaskService } from '../task.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-task-card',
  templateUrl: 'task-card.component.html',
  styleUrls: ['task-card.component.scss']
})
export class TaskCardComponent {

  @Input()
  task!: Task;

  @Output()
  discarded = new EventEmitter();

  @Output()
  taskEdited = new EventEmitter();

  taskForm = new BehaviorSubject({});

  constructor(
    private taskService: TaskService,
  ) { }

  get imagePath() {
    let index = this.task.symbol ? this.task.symbol : 0;
    return `assets/${Symbols.list[index]}.svg`;
  }

  ngOnInit(): void {
    this.taskForm.next(this.task);
  }

  onTaskDiscarded(): void {
    this.taskService.deleteTask(this.task._id || '').subscribe({
      next: () => {
        this.discarded.emit(this.task._id || '');
      },
      error: (error) => {
        alert('Failed to destroy task');
        console.error(error);
      }
    });
  }

  editTask(task: Task): void {
    this.taskService.updateTask(this.task._id || '', task)
      .subscribe({
        next: () => {
          this.taskEdited.emit()
        },
        error: (error) => {
          alert('Failed to update task');
          console.error(error);
        }
      })
  }
}
