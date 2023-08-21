import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-celestial-toggle',
  templateUrl: 'celestial-toggle.component.html',
  styleUrls: ['celestial-toggle.component.scss']
})
export class CelestialToggleComponent {

  @Input()
  id!: number;

  @Input()
  value: boolean = false;

  @Output()
  statusChanged = new EventEmitter<boolean>();

  celestialToggleId: string = '';

  ngOnInit(): void {
    this.celestialToggleId = `celestial-toggle-${this.id}`;
  }

  onStatusChange() {
    this.value = !this.value;
    this.statusChanged.emit(this.value);
  }

}
