import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';
import { Symbols } from '../symbols';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input() task!: Task;

  @Output() discarded = new EventEmitter<string>();

  // srcUrl = this.task.symbol ? 'assets/' + Symbols.list[this.task.symbol] + '.svg' : 'assets/' + Symbols.list[0] + '.svg';
  srcUrl = 'assets/' + Symbols.list[7] + '.svg';

  discardTask(id: string): void {
    let isConfirm = confirm('Discarding will permanently destroy task');
    if (!isConfirm) {
      return;
    }
    console.log('EMIT');
    this.discarded.emit(id);
  }
}
