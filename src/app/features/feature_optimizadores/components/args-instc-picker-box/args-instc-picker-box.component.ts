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
  selector: 'myrmex-args-instc-picker-box',
  templateUrl: './args-instc-picker-box.component.html',
  styleUrls: ['./args-instc-picker-box.component.scss'],
})

export class ArgsInstcPickerBoxComponent implements OnInit, OnChanges {

  args_paramz: ArgumentoParametrizacion[] = [];
  arg_apertura: boolean[] = [];
  arg_selecto: string | null = null;

  @Input() paramz_problm_id: string  = '';
  @Input() args_editados: {[clave_param: string]: string} = {};
  @Output() emitir_seleccion = new EventEmitter<string | null>();
  @Output() emitir_argumentos = new EventEmitter<{[clave_param: string]: string}>();

  async ngOnInit ( ) {
    await this.loadArgsParamz();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_problem_id) {
      if (changes.paramz_problem_id.firstChange) await this.loadArgsParamz();
    }
  }

  /**
  * Load argumentaciones parametrizacion from API
  */
  async loadArgsParamz ( ) {
    console.log(this.paramz_problm_id, this.arg_selecto, );
    if (!this.paramz_problm_id) return;

    await axios.get(
      environment.MYRMEX_API +
      '/parametrizacion_problema/identificador/' +
        this.paramz_problm_id + '/argumentaciones_instancia'
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.args_paramz = response.data.map(
            (argumentacion: any, i_args: number) => {
              const {
                clave_identificadora: clave_id,
                diccionario_argumentos,
                es_defecto,
              } = argumentacion;

              if (this.arg_selecto == null && es_defecto)
                this.arg_selecto = clave_id;

              if (this.arg_apertura.length >= i_args)
                this.arg_apertura.push(false);

              return new ArgumentoParametrizacion({
                  id: clave_id,
                  clave_id,
                  descripcion: null,
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
      .finally(( ) => {
        this.set_arg_selected(this.arg_selecto);
      });
  }

  /**
  * Save argumentaciones from API
  */
  async saveArgs (argumentacion: ArgumentoParametrizacion) {
    console.log(argumentacion, this.paramz_problm_id, this.arg_selecto);
    if (!argumentacion.clave_id) return;
    if (!this.paramz_problm_id) return;

    await axios.post(
      environment.MYRMEX_API + '/parametrizacion_problema/identificador/' +
        this.paramz_problm_id + '/argumentacion_instancia/actualizar',
      argumentacion.build_post()
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.id) {
          this.arg_selecto = response.data.diminutivo;
          this.loadArgsParamz();
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

    const arg_selecto: ArgumentoParametrizacion | undefined = (
      this.args_paramz.find(
        (arg_param: ArgumentoParametrizacion) =>
        arg_param.clave_id == this.arg_selecto
      )
    )

    if (arg_selecto) this.emitir_argumentos.emit(arg_selecto.argumentos);
  }

  init_save_args ( ) {
    if (this.no_es_guardable_argumentos()) return;

    const arg_selecto: ArgumentoParametrizacion | undefined = (
      this.args_paramz.find(
        (arg_param: ArgumentoParametrizacion) =>
        arg_param.clave_id == this.arg_selecto
      )
    )

    const argumentos = (
      arg_selecto ?
      {...arg_selecto.argumentos, ...this.args_editados} :
      {...this.args_editados}
    );

    const argumentacion: ArgumentoParametrizacion = (
      new ArgumentoParametrizacion({
        clave_id: this.paramz_problm_id + '_' + (new Date().getTime()),
        descripcion: '',
        argumentos,
      })
    );

    this.saveArgs(argumentacion);
  }

  init_edit_args ( ) {
    console.log('Entro', this.args_editados);
    if (this.no_es_editable_argumentos()) return;
    console.log('Pasa 1', this.arg_selecto, this.args_paramz);

    const arg_selecto: ArgumentoParametrizacion | undefined = (
      this.args_paramz.find(
        (arg_param: ArgumentoParametrizacion) =>
        arg_param.clave_id == this.arg_selecto
      )
    );

    console.log('arg', arg_selecto);
    if (!arg_selecto) return;

    console.log('Pasa 2');
    arg_selecto.argumentos = {
      ...arg_selecto.argumentos,
      ...this.args_editados
    };

    console.log('arg', arg_selecto);
    this.saveArgs(arg_selecto);
  }

  no_es_guardable_argumentos (): boolean {
    return Object.keys(this.args_editados).length == 0;
  }

  no_es_editable_argumentos (): boolean {
    return (
      this.arg_selecto == null ||
      Object.keys(this.args_editados).length == 0
    );
  }

}