import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  tasks$: Observable<Task[]> = new Observable();

  chosenTask!: Task;
  unChosenTask!: Task;

  constructor(private tasksService: TaskService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  onDiscarded(id: string): void {
    this.tasksService.deleteTask(id).subscribe({
      next: () => this.fetchTasks()
    });
  }

  chooseTask(task: Task) {
    this.unChosenTask = {};
    this.chosenTask = task;
  }

  closeTask() {
    // put the chosen card back in the deck
    this.unChosenTask = this.chosenTask;
    this.chosenTask = {};
  }

  private fetchTasks(): void {
    this.tasks$ = this.tasksService.getTasks();
  }
}