import {
  Component,
  EventEmitter,
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
  @Input() arg_selecto_argumentos: {[clave_param: string]: string} = {};
  @Output() args_editados = new EventEmitter<{[clave_param: string]: string}>();

  async ngOnInit ( ) {
    await this.loadParamzAlgrtm();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_algrtm_id) {
      if (changes.paramz_algrtm_id.firstChange) await this.loadParamzAlgrtm();
    }

    if (changes.arg_selecto_argumentos) {
      this.init_args();
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

    this.set_args_editados();
  }

  getParamTypeIcon (i_param: number): string {
    const tipo = this.paramz_algrtm[i_param].get_dato('tipo');

    if (tipo.includes('[') && tipo.includes(']')) return 'data_array';
    if (tipo.includes('numero')) return 'numbers';
    if (tipo.includes('texto')) return 'title';
    if (tipo.includes('opcion')) return 'alt_route';
    return 'question_mark';
  }

  set_args_editados () {
    const args: {[clave_param: string]: string} = {};

    for (let param_algrtm of this.paramz_algrtm) {
      if (
        param_algrtm.get_dato('valor') !=
          param_algrtm.get_dato('valor_inicial')
      ) {
        args[param_algrtm.get_dato('clave')] = param_algrtm.get_dato('valor');
      }
    }

    this.args_editados.emit(args);
  }

  init_args ( ) {
    for (let param_algrtm of this.paramz_algrtm) {
      if (this.arg_selecto_argumentos[param_algrtm.get_dato('clave')]) {
        param_algrtm.set_dato(
          'valor_inicial',
          this.arg_selecto_argumentos[param_algrtm.get_dato('clave')]
        );
      }
    }

    this.set_args_editados();
  }

}