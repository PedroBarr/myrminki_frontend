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
  ParametroEditable,
  ParametrizacionEditable,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-paramz-algrtm-editor-box',
  templateUrl: './paramz-algrtm-editor-box.component.html',
  styleUrls: ['./paramz-algrtm-editor-box.component.scss'],
})

export class ParamzAlgrtmEditorBoxComponent implements OnInit, OnChanges {

  paramz_algrtm: ParametrizacionEditable = new ParametrizacionEditable();

  restricciones: {[clave_tipo: string]: any} = {};
  tipos: string[] = [];

  es_modificado: boolean = false;

  @Input() paramz_algrtm_id: string | null = null;
  @Output() emitir_confirmacion = new EventEmitter<ParametrizacionEditable>();

  async ngOnInit ( ) {
    await this.loadRestrcts();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_algrtm_id) {
      await this.loadParamzAlgrtm();
    }
  }

  /**
  * Load parametrization algorithm from API
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
            this.paramz_algrtm.params_list = (
              response.data.lista_parametros.map(
                (parametro: any) => {
                  const {
                    clave,
                    defecto,
                    descripcion,
                    nombre,
                    representacion_matematica,
                    tipo,
                  } = parametro;

                  const restricciones = parametro.restricciones.map(
                    (restric: any) => {
                      if (restric.tipo == 'tipo' || restric.tipo == 'opcion') {
                        return {
                          tipo_restriccion: restric.tipo,
                          valor_restriccion: (
                            '|' +
                            restric.valor.replaceAll('|', '||') +
                            '|'
                          ),
                        }
                      } else {
                        return {
                          tipo_restriccion: restric.tipo,
                          valor_restriccion: restric.valor,
                        }
                      }
                    }
                  );

                  return new ParametroEditable({
                      clave,
                      defecto,
                      descripcion,
                      nombre,
                      representacion_matematica,
                      tipo: tipo.replaceAll('[]',''),
                      es_matricial: tipo.includes('[]'),
                      dimensiones_matriciales: tipo.split('[]').length - 1,
                      restricciones,
                  });
                }
              )
            );
          }
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => {
        this.confirm_parametrization();
      });
  }

  /**
  * Load restrictions from API
  */
  async loadRestrcts ( ) {
    await axios.get(
      environment.MYRMEX_API + '/parametrizacion_algoritmo/tipos/restricciones'
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.restricciones = response.data;

          this.tipos = Object
            .keys(this.restricciones)
            .filter((tipo) => tipo != "arreglo");
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  add_paramz_algrtm_param ( ) {
    this.paramz_algrtm.params_list.push(new ParametroEditable());
  }

  set_es_modificado (valor: boolean) {
    this.es_modificado = valor;
  }

  confirm_parametrization () {
    this.emitir_confirmacion.emit(this.paramz_algrtm);
    this.es_modificado = false;
  }

  cargar_cambios (i_param: number, cambios: any[2]) {
    this.paramz_algrtm.params_list[i_param].set_dato(String(cambios[0]), cambios[1]);
    this.set_es_modificado(true);
  }

  get_restricciones (i_param: number): {[clave_restrc: string]: any} {
    const param: ParametroEditable = this.paramz_algrtm.params_list[i_param];

    let restricciones = param.tipo ? this.restricciones[param.tipo] : {};

    if (param.es_matricial) {
      restricciones = {
        ...restricciones,
        ...this.restricciones['arreglo']
      }
    }

    return restricciones;
  }

}