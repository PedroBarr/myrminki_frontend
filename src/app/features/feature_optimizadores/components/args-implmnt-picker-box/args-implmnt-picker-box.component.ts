import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import axios from 'axios';

import { ArgumentoParametrizacion } from '../../models/optimizador.model';

import {
  ArgsImplmntEditorBoxComponent
} from '../args-implmnt-editor-box/args-implmnt-editor-box.component';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-args-implmnt-picker-box',
  templateUrl: './args-implmnt-picker-box.component.html',
  styleUrls: ['./args-implmnt-picker-box.component.scss'],
})

export class ArgsImplmntPickerBoxComponent implements OnInit, OnChanges {

  args_paramz: ArgumentoParametrizacion[] = [];
  arg_apertura: boolean[] = [];

  arg_editor_apertura: boolean = false;

  @Input() arg_selecto: string | null = null;
  @Input() paramz_algrtm_id: string  = '';
  @Input() args_editados: {[clave_param: string]: string} = {};

  @Input() es_editor: boolean = true;
  @Input() es_emergente: boolean = false;
  @Input() con_defecto: boolean = true;

  @Output() emitir_seleccion = new EventEmitter<string | null>();
  @Output() emitir_argumentos = new EventEmitter<{[clave_param: string]: string}>();

  constructor (
    public arg_editor_emergente: MatDialog,
  ) { }

  async ngOnInit ( ) {
    await this.loadArgsParamz();
  }

  async ngOnChanges ( changes: any ) {
    if (changes.paramz_algrtm_id) {
      if (changes.paramz_algrtm_id.firstChange) await this.loadArgsParamz();
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
          const data = (
            this.con_defecto ?
            response.data :
            response.data.filter((argumentacion: any) =>
              argumentacion.clave_identificadora != null
            )
          );

          this.args_paramz = data.map(
            (argumentacion: any, i_args: number) => {
              const {
                clave_identificadora: clave_id,
                descripcion,
                diccionario_argumentos,
                es_defecto,
              } = argumentacion;

              if (this.arg_selecto == null && es_defecto)
                this.arg_selecto = clave_id;

              if (this.arg_apertura.length >= i_args)
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
      .finally(( ) => {
        this.set_arg_selected(this.arg_selecto);
      });
  }

  get_arg_apertura (i_args: number) {
    if (this.arg_apertura.length > i_args) return this.arg_apertura[i_args];
    return false;
  }

  set_arg_apertura (i_args: number, valor: boolean) {
    this.arg_apertura[i_args] = valor;
  }

  set_arg_creador_apertura (variable: boolean) {
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

    this.arg_editor_apertura = variable;

    const arg_editor_referencia = this.arg_editor_emergente.open(
      ArgsImplmntEditorBoxComponent,
      { panelClass: 'dialogo'}
    );

    const arg_editor_componente = arg_editor_referencia.componentInstance;

    arg_editor_componente.paramz_algrtm_id = this.paramz_algrtm_id;
    arg_editor_componente.argumentacion = new ArgumentoParametrizacion({
      clave_id: this.paramz_algrtm_id + '_' + (new Date().getTime()),
      descripcion: '',
      argumentos,
    });

    arg_editor_referencia.afterClosed().subscribe((result: any) => {
      if (result) this.arg_selecto = result;

      this.arg_editor_apertura = !variable;
      this.loadArgsParamz();
    });
  }

  set_arg_editor_apertura (variable: boolean) {
    if (this.no_es_guardable_argumentos()) return;

    const arg_selecto: ArgumentoParametrizacion | undefined = (
      this.args_paramz.find(
        (arg_param: ArgumentoParametrizacion) =>
        arg_param.clave_id == this.arg_selecto
      )
    )

    if (!arg_selecto) return;

    const argumentos = {
      ...arg_selecto.argumentos,
      ...this.args_editados
    };

    this.arg_editor_apertura = variable;

    const arg_editor_referencia = this.arg_editor_emergente.open(
      ArgsImplmntEditorBoxComponent,
      { panelClass: 'dialogo'}
    );

    const arg_editor_componente = arg_editor_referencia.componentInstance;

    arg_editor_componente.paramz_algrtm_id = this.paramz_algrtm_id;
    arg_editor_componente.argumentacion = new ArgumentoParametrizacion({
      id: arg_selecto.clave_id,
      clave_id: arg_selecto.clave_id,
      descripcion: arg_selecto.descripcion,
      argumentos,
    });

    arg_editor_referencia.afterClosed().subscribe((result: any) => {
      if (result) this.arg_selecto = result;

      this.arg_editor_apertura = !variable;
      this.loadArgsParamz();
    });
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