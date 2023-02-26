import {
    Component
} from '@angular/core';

@Component({
  selector: 'myrmex-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {

  estaExtendido: boolean = false;

  constructor ( ) { }

}