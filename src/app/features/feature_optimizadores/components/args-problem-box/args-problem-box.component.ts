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
  selector: 'myrmex-args-problem-box',
  templateUrl: './args-problem-box.component.html',
  styleUrls: ['./args-problem-box.component.scss'],
})

export class ArgsProblemBoxComponent implements OnInit, OnChanges {

  paramz_problm: ParametrizacionAlgoritmo[] = [];

  @Input() paramz_problm_id: string  = '';
  @Input() arg_selecto_argumentos: {[clave_param: string]: string} = {};
  @Output() args_editados = new EventEmitter<{[clave_param: string]: string}>();

  async ngOnInit ( ) {
    await this.loadParamzProblm();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_problm_id) {
      if (changes.paramz_problm_id.firstChange) await this.loadParamzProblm();
    }

    if (changes.arg_selecto_argumentos) {
      this.init_args();
    }
  }

  /**
  * Load argumentacion problem from API
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
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  reinitParam (i_param: number) {
    this.paramz_problm[i_param].set_dato(
      'valor',
      this.paramz_problm[i_param].get_dato('valor_inicial')
    );

    this.set_args_editados();
  }

  getParamTypeIcon (i_param: number): string {
    const tipo = this.paramz_problm[i_param].get_dato('tipo');

    if (tipo.includes('[') && tipo.includes(']')) return 'data_array';
    if (tipo.includes('numero')) return 'numbers';
    if (tipo.includes('texto')) return 'title';
    if (tipo.includes('opcion')) return 'alt_route';
    return 'question_mark';
  }

  set_args_editados () {
    const args: {[clave_param: string]: string} = {};

    for (let param_problm of this.paramz_problm) {
      if (
        param_problm.get_dato('valor') !=
          param_problm.get_dato('valor_inicial')
      ) {
        args[param_problm.get_dato('clave')] = param_problm.get_dato('valor');
      }
    }

    this.args_editados.emit(args);
  }

  init_args ( ) {
    for (let param_problm of this.paramz_problm) {
      if (this.arg_selecto_argumentos[param_problm.get_dato('clave')]) {
        param_problm.set_dato(
          'valor_inicial',
          this.arg_selecto_argumentos[param_problm.get_dato('clave')]
        );
      }
    }

    this.set_args_editados();
  }

}