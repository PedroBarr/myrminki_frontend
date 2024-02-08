import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'myrminki-frontend';
  currentEvent: MouseEvent | null = null;

  constructor () { }

  handleBodyClick (evt: MouseEvent) {
    evt.preventDefault();
    this.currentEvent = evt;
  }

  handleStopPropagation (evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

}
