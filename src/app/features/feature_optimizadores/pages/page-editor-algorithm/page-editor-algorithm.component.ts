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
  Acciones,
} from '../../models/acciones.model';

import {
  Algoritmo,
  ParametrizacionEditable,
} from '../../models/optimizador.model';

import { Etiqueta } from '../../models/etiqueta.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-editor-algorithm',
  templateUrl: './page-editor-algorithm.component.html',
  styleUrls: ['./page-editor-algorithm.component.scss'],
})

export class PageEditorAlgorithmComponent implements OnInit {

  algoritmo: Algoritmo = new Algoritmo();
  acciones: Acciones = new Acciones();

  parametrizacion_id: string | null = null;
  paramz_algrtm: ParametrizacionEditable = new ParametrizacionEditable();
  etiquetas: Etiqueta[] = [];

  descripcion_vista: 'E' | 'P' = 'E';
  matematizacion_vista: 'E' | 'P' = 'E';
  seudo_codigo_vista: 'E' | 'P' = 'E';

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    if (this.route.snapshot.paramMap.get('identificador') != null) {
      await this.loadActions();
      if (this.esEditable()) await this.loadAlgorithm();
      else this.router.navigateByUrl('/');
    } else {
      await this.loadGeneralActions();
    }
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

          if (data.etiquetas) {
            this.algoritmo.etiquetas = data.etiquetas.map(
              (etiqueta: any) => etiqueta.etiqueta
            );

            this.etiquetas = data.etiquetas.map(
              (tipo_algoritmo: any) => ({
                id: tipo_algoritmo.id,
                etiqueta: tipo_algoritmo.etiqueta,
                descripcion: tipo_algoritmo.descripcion,
              } as Etiqueta)
            );
          }

          if (data.descripcion) {
            this.algoritmo.descripcion_puntuada = data.descripcion;

            this.descripcion_vista = 'P';
          }

          if (data.matematizacion) {
            this.algoritmo.matematizacion_puntuada = data.matematizacion;

            this.matematizacion_vista = 'P';
          }

          if (data.seudo_codigo) {
            this.algoritmo.seudo_codigo_puntuado = data.seudo_codigo;

            this.seudo_codigo_vista = 'P';
          }

          if (data.parametrizacion_algoritmo_diminutivo) {
            this.algoritmo.parametrizacion_id = (
              data.parametrizacion_algoritmo_diminutivo
            );

            this.parametrizacion_id = data.parametrizacion_algoritmo_diminutivo;
          }
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

  /**
   * Load general actions from API
   */
  async loadGeneralActions ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/optimizadores/acciones',
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

  /**
  * Save algorithm from API
  */
  async saveAlgorithm ( ) {
    if (this.no_es_guardable_algoritmo()) return;

    const post_data = this.algoritmo.build_post();

    post_data['parametrizacion'] = this.paramz_algrtm.build_post(
      this.algoritmo.algoritmo_id ? post_data['id'] : post_data['diminutivo'],
      this.parametrizacion_id ? this.parametrizacion_id : null
    );

    post_data['tipificacion'] = this.etiquetas.map(
      (etiqueta: any) => {
        const etiqueta_obj = new Etiqueta();
        etiqueta_obj.fill_obj(etiqueta);
        return etiqueta_obj.build_post()
      }
    );

    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.post(
      environment.MYRMEX_API + '/algoritmo/actualizar',
      post_data,
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.id) {
          this.router.navigateByUrl(
            '/algoritmo/visor/' +
            response.data.diminutivo
          );
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

  toggle_descripcion_vista ( ) {
    switch (this.descripcion_vista) {
      case 'E':
        this.descripcion_vista = 'P';
        break;
      case 'P':
        this.descripcion_vista = 'E';
        break;
    }
  }

  toggle_matematizacion_vista ( ) {
    switch (this.matematizacion_vista) {
      case 'E':
        this.matematizacion_vista = 'P';
        break;
      case 'P':
        this.matematizacion_vista = 'E';
        break;
    }
  }

  toggle_seudo_codigo_vista ( ) {
    switch (this.seudo_codigo_vista) {
      case 'E':
        this.seudo_codigo_vista = 'P';
        break;
      case 'P':
        this.seudo_codigo_vista = 'E';
        break;
    }
  }

  no_es_guardable_algoritmo ( ): boolean {
    return (
      !this.algoritmo.titulo ||
      !this.algoritmo.descripcion_puntuada ||
      !this.algoritmo.matematizacion_puntuada ||
      !this.algoritmo.seudo_codigo_puntuado ||
      !this.paramz_algrtm.params_list.length ||
      this.paramz_algrtm.params_list.length == 0
    );
  }

  update_paramz (paramz: ParametrizacionEditable) {
    this.paramz_algrtm = paramz;
  }

  remove_etiqueta (etiqueta_id: string) {
    this.etiquetas = this.etiquetas.filter(
      (etiqueta: Etiqueta) => etiqueta.id != etiqueta_id
    );
  }

  public esEditable ( ) {
    return (
      (
        (
          this.route.snapshot.paramMap.get('identificador') ||
          this.algoritmo.algoritmo_id
        ) &&
        this.acciones.actualizar_algoritmo
      ) ||
      (
        this.acciones.crear_algoritmo
      )
    );
  }

}