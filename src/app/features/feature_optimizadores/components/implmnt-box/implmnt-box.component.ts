import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import axios from 'axios';

import {
  Implementacion,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-implmnt-box',
  templateUrl: './implmnt-box.component.html',
  styleUrls: ['./implmnt-box.component.scss'],
})

export class ImplmntBoxComponent {

  @Input() implementacion: Implementacion = new Implementacion();
  @Input() args_editables: boolean = true;
  @Input() secciones_colapsables: boolean = true;
  @Input() args_id: string = '';

  @Input() arg_selecto: string | null = null;
  @Input() args_editados: {[clave_param: string]: string} = {};
  @Input() arg_selecto_argumentos: {[clave_param: string]: string} = {};

  @Output() emitir_seleccion = new EventEmitter<string | null>();
  @Output() emitir_args_editados = new EventEmitter<{[clave_param: string]: string}>();
  @Output() emitir_argumentos = new EventEmitter<{[clave_param: string]: string}>();


  descripcion_apertura: boolean = true;
  argumentacion_apertura: boolean = true;
  codigo_apertura: boolean = true;

  set_descripcion_apertura (variable: boolean) {
    if (!this.secciones_colapsables) return;
    else this.descripcion_apertura = variable;
  }

  set_argumentacion_apertura (variable: boolean) {
    if (!this.secciones_colapsables) return;
    else this.argumentacion_apertura = variable;
  }

  set_codigo_apertura (variable: boolean) {
    if (!this.secciones_colapsables) return;
    else this.codigo_apertura = variable;
  }

  set_arg_selecto (valor: string | null) {
    this.arg_selecto = valor;
    this.emitir_seleccion.emit(valor)
  }

  set_args_editados (valor: {[clave_param: string]: string}) {
    this.args_editados = valor;
    this.emitir_args_editados.emit(valor);
  }

  set_arg_selecto_argumentos (valor: {[clave_param: string]: string}) {
    this.arg_selecto_argumentos = valor;
    this.emitir_argumentos.emit(valor);
  }

}