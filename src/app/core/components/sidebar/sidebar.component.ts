import {
    Component
} from '@angular/core';
import { mapSite } from '../../constants/map.constant';

@Component({
  selector: 'myrmex-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {

  estaExtendido: boolean = false;
  siteOptions: { titulo: string; icono: string; enlace: string; }[] = mapSite;

  constructor ( ) { }

}