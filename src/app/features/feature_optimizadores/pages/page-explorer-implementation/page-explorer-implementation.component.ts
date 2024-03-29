import {
    Component,
    OnInit,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  Implementacion,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-implementation',
  templateUrl: './page-explorer-implementation.component.html',
  styleUrls: ['./page-explorer-implementation.component.scss'],
})

export class PageExplorerImplementationComponent implements OnInit {

  implementacion: Implementacion = new Implementacion();

  arg_selecto: string | null = null;
  args_editados: {[clave_param: string]: string} = {};
  arg_selecto_argumentos: {[clave_param: string]: string} = {};

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit ( ) {
    this.loadImplementation();
  }

  /**
  * Load implementation from API
  */
  async loadImplementation ( ) {
    axios.get(
      environment.MYRMEX_API +
        '/implementacion/identificador/' +
        this.route.snapshot.paramMap.get('identificador'),
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;

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

  set_arg_selecto (valor: string | null) {
    this.arg_selecto = valor;
  }

  set_args_editados (valor: {[clave_param: string]: string}) {
    this.args_editados = valor;
  }

  set_arg_selecto_argumentos (valor: {[clave_param: string]: string}) {
    this.arg_selecto_argumentos = valor;
  }

}