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
  Problema,
  ParametrizacionEditable,
} from '../../models/optimizador.model';

import { Etiqueta } from '../../models/etiqueta.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-editor-problem',
  templateUrl: './page-editor-problem.component.html',
  styleUrls: ['./page-editor-problem.component.scss'],
})

export class PageEditorProblemComponent implements OnInit {

  problema: Problema = new Problema();
  acciones: Acciones = new Acciones();

  parametrizacion_id: string | null = null;
  paramz_problm: ParametrizacionEditable = new ParametrizacionEditable();
  etiquetas: Etiqueta[] = [];

  descripcion_vista: 'E' | 'P' = 'E';
  matematizacion_vista: 'E' | 'P' = 'E';

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    if (this.route.snapshot.paramMap.get('identificador') != null) {
      await this.loadActions();
      if (this.esEditable()) await this.loadProblem();
      else this.router.navigateByUrl('/');
    } else {
      await this.loadGeneralActions();
    }
  }

  /**
  * Load problem from API
  */
  async loadProblem ( ) {
    await axios.get(
      environment.MYRMEX_API +
        '/problema/identificador/' +
        this.route.snapshot.paramMap.get('identificador'),
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;

          if (data.diminutivo)
            this.problema.problema_id = data.diminutivo;

          if (data.nombre)
            this.problema.titulo = data.nombre;

          if (data.etiquetas) {
            this.problema.etiquetas = data.etiquetas.map(
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
            this.problema.descripcion_puntuada = data.descripcion;

            this.descripcion_vista = 'P';
          }

          if (data.matematizacion) {
            this.problema.matematizacion_puntuada = data.matematizacion;

            this.matematizacion_vista = 'P';
          }

          if (data.parametrizacion_problema_diminutivo) {
            this.problema.parametrizacion_id = (
              data.parametrizacion_problema_diminutivo
            );

            this.parametrizacion_id = data.parametrizacion_problema_diminutivo;
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
        '/problema/identificador/' +
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
  * Save problem from API
  */
  async saveProblem ( ) {
    if (this.no_es_guardable_problema()) return;

    const post_data = this.problema.build_post();

    post_data['parametrizacion'] = this.paramz_problm.build_post(
      this.problema.problema_id ? post_data['id'] : post_data['diminutivo'],
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
      environment.MYRMEX_API + '/problema/actualizar',
      post_data,
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.id) {
          this.router.navigateByUrl(
            '/problema/visor/' +
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

  no_es_guardable_problema ( ): boolean {
    return (
      !this.problema.titulo ||
      !this.problema.descripcion_puntuada ||
      !this.problema.matematizacion_puntuada ||
      !this.paramz_problm.params_list.length ||
      this.paramz_problm.params_list.length == 0
    );
  }

  update_paramz (paramz: ParametrizacionEditable) {
    this.paramz_problm = paramz;
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
          this.problema.problema_id
        ) &&
        this.acciones.actualizar_problema
      ) ||
      (
        this.acciones.crear_problema
      )
    );
  }

}