import {
  Component,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';

import axios from 'axios';

import { ParametrizacionProblema } from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-paramz-problem-box',
  templateUrl: './paramz-problem-box.component.html',
  styleUrls: ['./paramz-problem-box.component.scss'],
})

export class ParamzProblemBoxComponent implements OnInit, OnChanges {

  paramz_problm: ParametrizacionProblema[] = [];

  @Input() paramz_problem_id: string = '';

  async ngOnInit ( ) {
    await this.loadParamzAlgrtm();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_problem_id) {
      if (changes.paramz_problem_id.firstChange) await this.loadParamzAlgrtm();
    }
  }

  /**
  * Load parameterization algorithm from API
  */
  async loadParamzAlgrtm ( ) {
    if (!this.paramz_problem_id) return;

    await axios.get(
      environment.MYRMEX_API +
      '/parametrizacion_problema/identificador/' +
      this.paramz_problem_id
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          if (response.data.lista_parametros) {
            this.paramz_problm = response.data.lista_parametros.map(
              (parametro: any) => {
                const {
                  nombre,
                  descripcion,
                  restricciones = [],
                  ...datos
                } = parametro;

                return new ParametrizacionProblema({
                    nombre,
                    descripcion,
                    restricciones: restricciones.map((restriccion: any) => ({
                        tipo_restriccion: restriccion.tipo,
                        valor_restriccion: restriccion.valor
                      })),
                    datos,
                });
              }
            );
          }
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}