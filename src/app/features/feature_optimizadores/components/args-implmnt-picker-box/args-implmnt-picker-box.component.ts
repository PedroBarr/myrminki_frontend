import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import axios from 'axios';

import { ArgumentoParametrizacion } from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-args-implmnt-picker-box',
  templateUrl: './args-implmnt-picker-box.component.html',
  styleUrls: ['./args-implmnt-picker-box.component.scss'],
})

export class ArgsImplmntPickerBoxComponent implements OnInit, OnChanges {

  args_paramz: ArgumentoParametrizacion[] = [];
  arg_apertura: boolean[] = [];
  arg_selecto: string | null = null;

  @Input() paramz_algrtm_id: string  = '';
  @Output() emitir_seleccion = new EventEmitter<string | null>();

  async ngOnInit ( ) {
    await this.loadArgsParamz();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_algrtm_id.firstChange) {
      await this.loadArgsParamz();
    }
  }

  /**
  * Load argumentaciones parametrizacion from API
  */
  async loadArgsParamz ( ) {
    if (!this.paramz_algrtm_id) return;

    await axios.get(
      environment.MYRMEX_API +
      '/parametrizacion_algoritmo/identificador/' +
        this.paramz_algrtm_id + '/argumentaciones_solucion'
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.arg_apertura = [];

          this.args_paramz = response.data.map(
            (argumentacion: any) => {
              const {
                clave_identificadora: clave_id,
                descripcion,
                diccionario_argumentos,
                es_defecto,
              } = argumentacion;

              if (es_defecto) this.set_arg_selected(clave_id);

              this.arg_apertura.push(false);

              return new ArgumentoParametrizacion({
                  clave_id,
                  descripcion,
                  argumentos: diccionario_argumentos,
                  es_defecto,
              });
            }
          );
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  get_arg_apertura (i_args: number) {
    if (this.arg_apertura.length > i_args) return this.arg_apertura[i_args];
    return false;
  }

  set_arg_apertura (i_args: number, valor: boolean) {
    this.arg_apertura[i_args] = valor;
  }

  set_arg_selected (valor: string | null) {
    this.arg_selecto = valor;
    this.emitir_seleccion.emit(this.arg_selecto);
  }

}