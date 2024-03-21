import {
  Component,
  Input,
} from '@angular/core';

import axios from 'axios';

import { ArgumentoParametrizacion } from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-args-algorithm-args-box',
  templateUrl: './args-algorithm-args-box.component.html',
  styleUrls: ['./args-algorithm-args-box.component.scss'],
})

export class ArgsAlgorithmArgsBoxComponent {


  @Input() argumentacion: ArgumentoParametrizacion = (
    new ArgumentoParametrizacion()
  );
  @Input() esSelecto: Boolean = false;

}