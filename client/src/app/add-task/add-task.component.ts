import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Symbols } from '../symbols';

@Component({
  selector: 'app-add-task',
  templateUrl: 'add-task.component.html',
  styleUrls: ['add-task.component.scss']
})
export class AddTaskComponent {
  constructor(
    private router: Router,
    private taskService: TaskService
  ) { }

  addTask(task: Task): void {
    task.isComplete = !!task.isComplete;
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

  onTaskDiscarded(): void {
    this.router.navigate(['/tasks']);
  }

  getSymbol(): number {
    return Math.floor(Math.random() * Symbols.list.length);
  }
}