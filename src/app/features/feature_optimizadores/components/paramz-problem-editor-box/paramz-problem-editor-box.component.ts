import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import axios from 'axios';

import {
  ParametrizacionEditable,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-paramz-problem-editor-box',
  templateUrl: './paramz-problem-editor-box.component.html',
  styleUrls: ['./paramz-problem-editor-box.component.scss'],
})

export class ParamzProblemEditorBoxComponent implements OnInit, OnChanges {

  paramz_problm: ParametrizacionEditable[] = [];

  @Input() paramz_problm_id: string  = '';
  @Output() emitir_confirmacion = new EventEmitter<{[clave_param: string]: any}[]>();

  async ngOnInit ( ) {
    // await this.loadParamzProblm();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_problm_id) {
      // if (changes.paramz_problm_id.firstChange) await this.loadParamzProblm();
    }
  }

  /**
  * Load parametrization problem from API
  */
  async loadParamzProblm ( ) {
    if (!this.paramz_problm_id) return;

    await axios.get(
      environment.MYRMEX_API +
      '/parametrizacion_problema/identificador/' +
      this.paramz_problm_id
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          /*
          if (response.data.lista_parametros) {
            this.paramz_problm = response.data.lista_parametros.map(
              (parametro: any) => {
                const {
                  clave,
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
                      clave,
                    },
                });
              }
            );
          }
          */
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}