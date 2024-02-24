import {
    Component,
    OnInit,
} from '@angular/core';

import axios from 'axios';

import {
  Algoritmo,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-algorithm',
  templateUrl: './page-explorer-algorithm.component.html',
  styleUrls: ['./page-explorer-algorithm.component.scss'],
})

export class PageExplorerAlgorithmComponent implements OnInit {

  algoritmo: Algoritmo = new Algoritmo();

  descripcion_apertura: boolean = true;
  matematizacion_apertura: boolean = true;
  seudo_codigo_apertura: boolean = true;

  ngOnInit ( ) {
    this.loadAlgorithm();
  }

  set_descripcion_apertura (variable: boolean) {
    this.descripcion_apertura = variable;
  }

  set_matematizacion_apertura (variable: boolean) {
    this.matematizacion_apertura = variable;
  }

  set_seudo_codigo_apertura (variable: boolean) {
    this.seudo_codigo_apertura = variable;
  }

  /**
  * Load algorithm from API
  */
  async loadAlgorithm ( ) {
    axios.get(
      environment.MYRMEX_API + '/algoritmo/identificador/algrtm_init',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;

          if (data.nombre)
            this.algoritmo.titulo = data.nombre;

          if (data.etiquetas)
            this.algoritmo.etiquetas = data.etiquetas.map(
              (etiqueta: any) => etiqueta.etiqueta
            );

          if (data.descripcion)
            this.algoritmo.descripcion_puntuada = data.descripcion;

          if (data.matematizacion)
            this.algoritmo.matematizacion_puntuada = data.matematizacion;

          if (data.seudo_codigo)
            this.algoritmo.seudo_codigo_puntuado = data.seudo_codigo;

        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}