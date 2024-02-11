import {
  Component
} from '@angular/core';
import {
  pageDescriptores
} from 'src/app/shared/constants/descriptor.constant';

@Component({
  selector: 'myrmex-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})

export class PageMainComponent {

  descriptorPrincipal = pageDescriptores.inicio;
  descriptorEnlaces = [
      {
        desfase: 13,
        descriptor: pageDescriptores.explorar
      },
      {
        desfase: 50,
        descriptor: pageDescriptores.practica
      }
    ];

  constructor () { }
}