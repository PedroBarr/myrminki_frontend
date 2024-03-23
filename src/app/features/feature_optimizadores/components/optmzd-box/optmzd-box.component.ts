import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import axios from 'axios';

import {
  PrevisualizacionEntrada,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-optmzd-box',
  templateUrl: './optmzd-box.component.html',
  styleUrls: ['./optmzd-box.component.scss'],
})

export class OptmzdBoxComponent {

  @Input() optimizador: PrevisualizacionEntrada = new PrevisualizacionEntrada();

}