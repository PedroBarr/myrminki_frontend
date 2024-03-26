import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import axios from 'axios';

import {
  Problema,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-problm-box',
  templateUrl: './problm-box.component.html',
  styleUrls: ['./problm-box.component.scss'],
})

export class ProblmBoxComponent implements OnChanges {

  @Input() problema: Problema = new Problema();
  @Input() problema_id: string | null = null;

  @Input() secciones_colapsables: boolean = true;

  descripcion_apertura: boolean = true;
  matematizacion_apertura: boolean = true;

  ngOnChanges (changes: any) { }

  set_descripcion_apertura (variable: boolean) {
    if (!this.secciones_colapsables) return;
    else this.descripcion_apertura = variable;
  }

  set_matematizacion_apertura (variable: boolean) {
    if (!this.secciones_colapsables) return;
    else this.matematizacion_apertura = variable;
  }

  /**
  * Load problema from API
  */
  async loadProblema ( ) {
    if (!this.problema_id) return;

    axios.get(
      environment.MYRMEX_API + '/problema/identificador/' + this.problema_id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;

          if (data.nombre)
            this.problema.titulo = data.nombre;

          if (data.etiquetas)
            this.problema.etiquetas = data.etiquetas.map(
              (etiqueta: any) => etiqueta.etiqueta
            );

          if (data.descripcion)
            this.problema.descripcion_puntuada = data.descripcion;

          if (data.matematizacion)
            this.problema.matematizacion_puntuada = data.matematizacion;

          if (data.parametrizacion_problema_diminutivo)
            this.problema.parametrizacion_id = (
              data.parametrizacion_problema_diminutivo
            );

        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}