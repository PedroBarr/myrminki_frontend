import {
    Component,
    OnInit,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import {
  Implementacion,
} from '../../models/optimizador.model';

import {
  Acciones,
} from '../../models/acciones.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-implementation',
  templateUrl: './page-explorer-implementation.component.html',
  styleUrls: ['./page-explorer-implementation.component.scss'],
})

export class PageExplorerImplementationComponent implements OnInit {

  implementacion: Implementacion = new Implementacion();
  acciones: Acciones = new Acciones();

  arg_selecto: string | null = null;
  args_editados: {[clave_param: string]: string} = {};
  arg_selecto_argumentos: {[clave_param: string]: string} = {};

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    await this.loadImplementation();
    await this.loadActions();
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

  /**
   * Load actions from API
   */
  async loadActions ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API +
        '/implementacion/identificador/' +
        this.route.snapshot.paramMap.get('identificador') +
        '/acciones',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.acciones.fill_obj(response.data);
        }

      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => {
        this.authIntercepService.removeAuthInterceptor(
          axiosInstance,
          intercep_auth_id
        );

        this.authIntercepService.removeAuthErrorInterceptor(
          axiosInstance,
          intercep_error_id
        );
      });
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