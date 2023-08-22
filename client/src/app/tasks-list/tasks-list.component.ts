import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-tasks-list',
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({
          opacity: 0.5,
          transform: 'translateY(-100%)',
          margin: '0 -225px'
        }),
        animate('400ms cubic-bezier(0.2, 0.3, 0.5, 1)', style({
          opacity: 1,
          transform: 'translateY(0)',
          margin: 0,
          'z-index': 100
        })),
      ]),
    ]),
  ],
  templateUrl: 'tasks-list.component.html',
  styleUrls: ['tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  tasks$: Observable<Task[]> = new Observable();

  chosenTask: Task = {};
  unChosenTask: Task = {};
  showCompletedTasks: boolean = false;
  deckWrapperWidth!: number;

  constructor(
    private tasksService: TaskService,
  ) { }

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

  onStatusChanged(status: boolean) {
    this.showCompletedTasks = status;
    this.fetchTasks();

  }

  onResize(deckContainerWidth: number) {
    //calculate width for max number of cards with enough room for animation
    const marginPull = -50;
    const cardwidth = 225;
    // row length = number of cards per row
    // each card moves |marginPull| to the right on hover. up to two cards can move at the same time.
    // want 2 * marginPull buffer for hover
    // each card is pulled |marginPull| px to the left making each card take (cardwith + marginPull) px of space
    const rowLength = Math.floor((deckContainerWidth + (2 * marginPull)) / (cardwidth + marginPull));

    this.deckWrapperWidth = ((cardwidth + marginPull) * (rowLength)) - (3 * marginPull);
  }

  getDeckWrapperWidth(deckContainerWidth: number) {
    this.onResize(deckContainerWidth);
    return this.deckWrapperWidth + 'px';
  }

  private fetchTasks(): void {
    this.tasks$ = this.tasksService.getTasks().pipe(
      map(tasks =>
        tasks.filter(task => task.isComplete === this.showCompletedTasks)
      )
    )
  }
}