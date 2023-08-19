import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  template: `
   <h2 class="text-center m-5">Tasks List</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Title</th>
               <th>Due Date</th>
               <th>Notes</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let task of tasks$ | async">
               <td>{{task.title}}</td>
               <td>{{task.dueDate}}</td>
               <td>{{task.notes}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', task._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteTask(task._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Task</button>
 `
})
export class TasksListComponent implements OnInit {
  tasks$: Observable<Task[]> = new Observable();

  constructor(private tasksService: TaskService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe({
      next: () => this.fetchTasks()
    });
  }

  private fetchTasks(): void {
    this.tasks$ = this.tasksService.getTasks();
  }
}