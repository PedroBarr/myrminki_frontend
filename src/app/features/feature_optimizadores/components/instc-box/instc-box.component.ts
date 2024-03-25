import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import axios from 'axios';

import {
  Instancia,
  ArgumentoParametrizacion,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-instc-box',
  templateUrl: './instc-box.component.html',
  styleUrls: ['./instc-box.component.scss'],
})

export class InstcBoxComponent implements OnChanges {

  @Input() instancia: Instancia = new Instancia();
  @Input() instancia_id: string | null = null;

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
  matematizacion_apertura: boolean = true;
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

  set_matematizacion_apertura (variable: boolean) {
    if (!this.secciones_colapsables) return;
    else this.matematizacion_apertura = variable;
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
      '/argumentacion_instancia/identificador/' + this.args_id
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
  * Load instancia from API
  */
  async loadInstancia ( ) {
    if (!this.instancia_id) return;

    axios.get(
      environment.MYRMEX_API + '/instancia/identificador/' + this.instancia_id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;

          if (data.diminutivo)
            this.instancia.instancia_id = data.diminutivo;

          if (data.nombre)
            this.instancia.titulo = data.nombre;

          if (data.etiquetas)
            this.instancia.etiquetas = data.etiquetas.map(
              (etiqueta: any) => etiqueta.etiqueta
            );

          if (data.lenguaje_nombre)
            this.instancia.lenguaje_nombre = data.lenguaje_nombre;

          if (data.descripcion)
            this.instancia.descripcion_puntuada = data.descripcion;

          if (data.matematizacion)
            this.instancia.matematizacion_puntuada = data.matematizacion;

          if (data.codificacion)
            this.instancia.codigo_puntuado = data.codificacion;

          if (data.parametrizacion_problema_identificador)
            this.instancia.parametrizacion_id = (
              data.parametrizacion_problema_identificador
            );

        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}