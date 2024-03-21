import {
  Component,
  Input,
} from '@angular/core';

import axios from 'axios';

import { ArgumentoParametrizacion } from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-args-box',
  templateUrl: './args-box.component.html',
  styleUrls: ['./args-box.component.scss'],
})

export class ArgsBoxComponent {

  @Input() argumentacion: ArgumentoParametrizacion = (
    new ArgumentoParametrizacion()
  );
  @Input() esSelecto: Boolean = false;

}