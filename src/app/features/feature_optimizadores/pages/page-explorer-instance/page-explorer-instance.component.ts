import {
    Component,
    OnInit,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  Instancia,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-instance',
  templateUrl: './page-explorer-instance.component.html',
  styleUrls: ['./page-explorer-instance.component.scss'],
})

export class PageExplorerInstanceComponent implements OnInit {

  instancia: Instancia = new Instancia();

  arg_selecto: string | null = null;
  args_editados: {[clave_param: string]: string} = {};
  arg_selecto_argumentos: {[clave_param: string]: string} = {};

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit ( ) {
    this.loadInstancia();
  }

  /**
  * Load instancia from API
  */
  async loadInstancia ( ) {
    axios.get(
      environment.MYRMEX_API +
        '/instancia/identificador/' +
        this.route.snapshot.paramMap.get('identificador'),
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