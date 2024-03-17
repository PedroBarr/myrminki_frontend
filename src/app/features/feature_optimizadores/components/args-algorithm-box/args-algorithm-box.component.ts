import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import axios from 'axios';

import { ParametrizacionAlgoritmo } from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-args-algorithm-box',
  templateUrl: './args-algorithm-box.component.html',
  styleUrls: ['./args-algorithm-box.component.scss'],
})

export class ArgsAlgorithmBoxComponent implements OnInit, OnChanges {

  paramz_algrtm: ParametrizacionAlgoritmo[] = [];

  @Input() paramz_algrtm_id: string  = '';

  async ngOnInit ( ) {
    await this.loadParamzAlgrtm();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_algrtm_id.firstChange) {
      await this.loadParamzAlgrtm();
    }
  }

  /**
  * Load argumentacion algorithm from API
  */
  async loadParamzAlgrtm ( ) {
    if (!this.paramz_algrtm_id) return;

    await axios.get(
      environment.MYRMEX_API +
      '/parametrizacion_algoritmo/identificador/' +
      this.paramz_algrtm_id
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          if (response.data.lista_parametros) {
            this.paramz_algrtm = response.data.lista_parametros.map(
              (parametro: any) => {
                const {
                  nombre,
                  descripcion,
                  tipo,
                  defecto,
                } = parametro;

                return new ParametrizacionAlgoritmo({
                    nombre,
                    descripcion,
                    restricciones: [],
                    datos: {
                      tipo,
                      defecto,
                      valor: defecto,
                      valor_inicial: defecto,
                    },
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

  reinitParam (i_param: number) {
    this.paramz_algrtm[i_param].set_dato(
      'valor',
      this.paramz_algrtm[i_param].get_dato('valor_inicial')
    );
  }

  getParamTypeIcon (i_param: number): string {
    const tipo = this.paramz_algrtm[i_param].get_dato('tipo');

    if (tipo.includes('[') && tipo.includes(']')) return 'data_array';
    if (tipo.includes('numero')) return 'numbers';
    if (tipo.includes('texto')) return 'title';
    if (tipo.includes('opcion')) return 'alt_route';
    return 'question_mark';
  }

}