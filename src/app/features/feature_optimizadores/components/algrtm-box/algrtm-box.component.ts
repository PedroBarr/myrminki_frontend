import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import axios from 'axios';

import {
  Algoritmo,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-algrtm-box',
  templateUrl: './algrtm-box.component.html',
  styleUrls: ['./algrtm-box.component.scss'],
})

export class AlgrtmBoxComponent implements OnChanges {

  @Input() algoritmo: Algoritmo = new Algoritmo();
  @Input() algoritmo_id: string | null = null;

  @Input() secciones_colapsables: boolean = true;

  descripcion_apertura: boolean = true;
  matematizacion_apertura: boolean = true;
  seudo_codigo_apertura: boolean = true;

  ngOnChanges (changes: any) { }

  set_descripcion_apertura (variable: boolean) {
    if (!this.secciones_colapsables) return;
    else this.descripcion_apertura = variable;
  }

  set_matematizacion_apertura (variable: boolean) {
    if (!this.secciones_colapsables) return;
    else this.matematizacion_apertura = variable;
  }

  set_seudo_codigo_apertura (variable: boolean) {
    if (!this.secciones_colapsables) return;
    else this.seudo_codigo_apertura = variable;
  }

  /**
  * Load algorithm from API
  */
  async loadAlgorithm ( ) {
    if (!this.algoritmo_id) return;

    axios.get(
      environment.MYRMEX_API + '/algoritmo/identificador/' + this.algoritmo_id,
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

          if (data.parametrizacion_algoritmo_diminutivo)
            this.algoritmo.parametrizacion_id = (
              data.parametrizacion_algoritmo_diminutivo
            );

        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}