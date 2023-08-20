import { Component, OnInit } from '@angular/core';
import { Observable, window } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: 'tasks-list.component.html',
  styleUrls: ['tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  tasks$: Observable<Task[]> = new Observable();

  chosenTask: Task = {};
  unChosenTask: Task = {};
  rowLength = 0;

  constructor(private tasksService: TaskService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  refreshDeck(): void {
    this.fetchTasks();
    this.closeTask();
  }

  chooseTask(task: Task): void {
    // pull card out of the deck
    this.unChosenTask = {};
    this.chosenTask = task;
  }

  closeTask(): void {
    // put the chosen card back in the deck
    this.unChosenTask = this.chosenTask;
    this.chosenTask = {};
  }

  private fetchTasks(): void {
    this.tasks$ = this.tasksService.getTasks();
  }
}