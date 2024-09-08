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
  Algoritmo,
} from '../../models/optimizador.model';

import {
  Acciones,
} from '../../models/acciones.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-algorithm',
  templateUrl: './page-explorer-algorithm.component.html',
  styleUrls: ['./page-explorer-algorithm.component.scss'],
})

export class PageExplorerAlgorithmComponent implements OnInit {

  algoritmo: Algoritmo = new Algoritmo();
  acciones: Acciones = new Acciones();

  descripcion_apertura: boolean = true;
  matematizacion_apertura: boolean = true;
  seudo_codigo_apertura: boolean = true;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    await this.loadAlgorithm();
    await this.loadActions();
  }

  set_descripcion_apertura (variable: boolean) {
    this.descripcion_apertura = variable;
  }

  set_matematizacion_apertura (variable: boolean) {
    this.matematizacion_apertura = variable;
  }

  set_seudo_codigo_apertura (variable: boolean) {
    this.seudo_codigo_apertura = variable;
  }

  /**
  * Load algorithm from API
  */
  async loadAlgorithm ( ) {
    await axios.get(
      environment.MYRMEX_API +
        '/algoritmo/identificador/' +
        this.route.snapshot.paramMap.get('identificador'),
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;

          if (data.diminutivo)
            this.algoritmo.algoritmo_id = data.diminutivo;

          if (data.nombre)
            this.algoritmo.titulo = data.nombre;

          if (data.etiquetas)
            this.algoritmo.etiquetas = data.etiquetas.map(
              (etiqueta: any) => etiqueta.etiqueta
            );

          if (data.descripcion)
            this.algoritmo.descripcion_puntuada = data.descripcion;

          if (data.matematizacion)
            this.algoritmo.matematizacion_puntuada = data.matematizacion;

          if (data.seudo_codigo)
            this.algoritmo.seudo_codigo_puntuado = data.seudo_codigo;

          if (data.parametrizacion_algoritmo_diminutivo)
            this.algoritmo.parametrizacion_id = (
              data.parametrizacion_algoritmo_diminutivo
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
        '/algoritmo/identificador/' +
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

}