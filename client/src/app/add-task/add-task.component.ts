import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Symbols } from '../symbols';

@Component({
  selector: 'app-add-task',
  template: `
   <h2 class="text-center m-5">Add a New Task</h2>
   <app-task-form (formSubmitted)="addTask($event)"></app-task-form>
 `
})
export class AddTaskComponent {
  constructor(
    private router: Router,
    private taskService: TaskService
  ) { }

  addTask(task: Task) {
    task.isComplete = false;
    task.symbol = this.getSymbol();
    this.taskService.createTask(task)
      .subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          alert("Failed to create task");
          console.error(error);
        }
      });
  }

  getSymbol() {
    return Math.floor(Math.random() * Symbols.list.length);
  }
}