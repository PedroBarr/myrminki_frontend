import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import axios from 'axios';

import {
  Implementacion,
  ArgumentoParametrizacion,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-implmnt-box',
  templateUrl: './implmnt-box.component.html',
  styleUrls: ['./implmnt-box.component.scss'],
})

export class ImplmntBoxComponent implements OnChanges{

  @Input() implementacion: Implementacion = new Implementacion();
  @Input() implementacion_id: string | null = null;

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

  argumentacion: ArgumentoParametrizacion = new ArgumentoParametrizacion();

  ngOnChanges (changes: any) {
    if (changes.args_id) {
      if (changes.args_id.firstChange) this.loadArgs();
    }
  }

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

  /**
  * Load argumentacion from API
  */
  async loadArgs ( ) {
    if (!this.args_id) return;

    await axios.get(
      environment.MYRMEX_API +
      '/argumentacion_solucion/identificador/' + this.args_id
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data: any = response.data;

          if (data.diminutivo)
            this.argumentacion.clave_id = data.diminutivo;

          if (data.diccionario_argumentos)
            this.argumentacion.argumentos = data.diccionario_argumentos;
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  /**
  * Load implementation from API
  */
  async loadImplementation ( ) {
    if (!this.implementacion_id) return;

    axios.get(
      environment.MYRMEX_API +
        '/implementacion/identificador/' + this.implementacion_id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;
          this.implementacion = new Implementacion();

          if (data.diminutivo)
            this.implementacion.implementacion_id = data.diminutivo;

          if (data.nombre)
            this.implementacion.titulo = data.nombre;

          if (data.etiquetas)
            this.implementacion.etiquetas = data.etiquetas.map(
              (etiqueta: any) => etiqueta.etiqueta
            );

          if (data.lenguaje_nombre)
            this.implementacion.lenguaje_nombre = data.lenguaje_nombre;

          if (data.descripcion)
            this.implementacion.descripcion_puntuada = data.descripcion;

          if (data.codificacion)
            this.implementacion.codigo_puntuado = data.codificacion;

          if (data.parametrizacion_algoritmo_identificador)
            this.implementacion.parametrizacion_id = (
              data.parametrizacion_algoritmo_identificador
            );

        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}