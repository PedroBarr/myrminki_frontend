import {
  Component,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';

import axios from 'axios';

import { ParametrizacionAlgoritmo } from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-paramz-algorithm-box',
  templateUrl: './paramz-algorithm-box.component.html',
  styleUrls: ['./paramz-algorithm-box.component.scss'],
})

export class ParamzAlgorithmBoxComponent implements OnInit, OnChanges {

  paramz_algrtm: ParametrizacionAlgoritmo[] = [];

  @Input() paramz_algrtm_id: string = '';

  async ngOnInit ( ) {
    await this.loadParamzAlgrtm();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_algrtm_id.firstChange) {
      await this.loadParamzAlgrtm();
    }
  }

  /**
  * Load parameterization algorithm from API
  */
  async loadParamzAlgrtm ( ) {
    if (!this.paramz_algrtm_id) return;
    console.log('In here', this.paramz_algrtm_id);

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
                  restricciones = [],
                  ...datos
                } = parametro;

                return new ParametrizacionAlgoritmo({
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
    /*this.paramz_algrtm.push(
      new ParametrizacionAlgoritmo({
        nombre: 'Constante K',
        descripcion: 'Descripcion lorem ipsum que es una constante para leer alguito',
        restricciones: [
          {tipo_restriccion:'min',valor_restriccion:'0'}
        ],
        datos: {
          clave: 'k_val',
          defecto: 1,
          nombre: 'Constante K',
          representacion_matematica: 'k_{val}',
          tipo: 'number'
        },
      }),
      new ParametrizacionAlgoritmo({
        nombre: 'Constante K',
        descripcion: 'Descripcion lorem ipsum que es una constante para leer alguito',
        restricciones: [
          {tipo_restriccion:'min',valor_restriccion:'0'}
        ],
        datos: {
          clave: 'k_val',
          defecto: 1,
          nombre: 'Constante K',
          representacion_matematica: 'k_{val}',
          tipo: 'number'
        },
      }),
      new ParametrizacionAlgoritmo({
        nombre: 'Constante K',
        descripcion: 'Descripcion lorem ipsum que es una constante para leer alguito',
        restricciones: [
          {tipo_restriccion:'min',valor_restriccion:'0'}
        ],
        datos: {
          clave: 'k_val',
          defecto: 1,
          nombre: 'Constante K',
          representacion_matematica: 'k_{val}',
          tipo: 'number'
        },
      }),
      new ParametrizacionAlgoritmo({
        nombre: 'Constante K',
        descripcion: 'Descripcion lorem ipsum que es una constante para leer alguito',
        restricciones: [
          {tipo_restriccion:'min',valor_restriccion:'0'}
        ],
        datos: {
          clave: 'k_val',
          defecto: 1,
          nombre: 'Constante K',
          representacion_matematica: 'k_{val}',
          tipo: 'number'
        },
      })
    )*/
  }

}