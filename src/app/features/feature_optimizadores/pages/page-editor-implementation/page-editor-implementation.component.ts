import {
    Component,
    OnInit,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import {
  Acciones,
} from '../../models/acciones.model';

import {
  Implementacion
} from '../../models/optimizador.model';

import {
  AlgrtmBoxComponent
} from '../../components/algrtm-box/algrtm-box.component';

import {
  AlgrtmPickerBoxComponent
} from '../../components/algrtm-picker-box/algrtm-picker-box.component';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-editor-implementation',
  templateUrl: './page-editor-implementation.component.html',
  styleUrls: ['./page-editor-implementation.component.scss'],
})

export class PageEditorImplementationComponent implements OnInit {

  implementacion: Implementacion = new Implementacion();
  acciones: Acciones = new Acciones();

  lenguajes_habilitados: string[] = [];
  descripcion_vista: 'E' | 'P' = 'E';
  codigo_vista: 'E' | 'P' = 'E';

  algrtm_selector_apertura: boolean = false;
  algrtm_visor_apertura: boolean = false;

  algrtm_selecto: string | null = null;
  paramz_algrtm_selecto: string | null = null;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    public algrtm_selector_emergente: MatDialog,
    public algrtm_visor_emergente: MatDialog,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    await this.loadLangs();

    if (this.route.snapshot.paramMap.get('identificador') != null) {
      await this.loadActions();
      if (this.esEditable()) await this.loadImplementation();
      else this.router.navigateByUrl('/');
    } else {
      await this.loadGeneralActions();
    }
  }

  /**
  * Load languages from API
  */
  async loadLangs ( ) {
    await axios.get(
      environment.MYRMEX_API + '/lenguajes_programacion_habilitados'
    )
      .then(response => {
        console.log(response.data);

        if (
          response.data &&
          response.data.length &&
          response.data.length > 0
        ) {
          this.lenguajes_habilitados = response.data;
          this.implementacion.lenguaje_nombre = response.data[0];
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
    await axios.get(
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

          if (data.descripcion) {
            this.implementacion.descripcion_puntuada = data.descripcion;

            this.descripcion_vista = 'P';
          }

          if (data.codificacion) {
            this.implementacion.codigo_puntuado = data.codificacion;

            this.codigo_vista = 'P';
          }

          if (data.parametrizacion_algoritmo_identificador) {
            this.implementacion.parametrizacion_id = (
              data.parametrizacion_algoritmo_identificador
            );

            this.paramz_algrtm_selecto = (
              data.parametrizacion_algoritmo_identificador
            );
          }

          if (data.algoritmo_diminutivo) {
            this.implementacion.algoritmo_id = (
              data.algoritmo_diminutivo
            );

            this.algrtm_selecto = data.algoritmo_diminutivo;
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
  * Save implementation from API
  */
  async saveImplementation ( ) {
    if (this.no_es_guardable_implementacion()) return;

    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.post(
      environment.MYRMEX_API + '/implementacion/actualizar',
      this.implementacion.build_post()
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.id) {
          this.router.navigateByUrl('/implementacion/visor/' + response.data.diminutivo);
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

  toggle_codigo_vista ( ) {
    switch (this.codigo_vista) {
      case 'E':
        this.codigo_vista = 'P';
        break;
      case 'P':
        this.codigo_vista = 'E';
        break;
    }
  }

  no_es_guardable_implementacion ( ): boolean {
    return (
      !this.implementacion.algoritmo_id ||
      !this.implementacion.titulo ||
      !this.implementacion.lenguaje_nombre ||
      !this.implementacion.descripcion_puntuada ||
      !this.implementacion.codigo_puntuado
    );
  }

  set_algrtm_selector_apertura (variable: boolean) {
    this.algrtm_selector_apertura = variable;

    const algrtm_selector_referencia = this.algrtm_selector_emergente.open(
      AlgrtmPickerBoxComponent,
      { panelClass: 'emergente-selector'}
    );

    const algrtm_selector_componente = (
      algrtm_selector_referencia.componentInstance
    );

    algrtm_selector_componente.algrtm_selecto = this.algrtm_selecto;
    algrtm_selector_componente.es_emergente = true;

    algrtm_selector_componente.emitir_seleccion.subscribe((result: any) => {
      if (result) this.set_algrtm_selected(result);

      this.algrtm_selector_apertura = !variable;
    });

    algrtm_selector_componente.emitir_parametros.subscribe((result: any) => {
      if (result) this.set_paramz_algrtm_selected(result);

      this.algrtm_selector_apertura = !variable;
    });

    algrtm_selector_referencia.afterClosed().subscribe((result: any) => {
      this.algrtm_selector_apertura = !variable;
    });
  }

  set_algrtm_visor_apertura (variable: boolean) {
    this.algrtm_visor_apertura = variable;

    const algrtm_visor_referencia = this.algrtm_visor_emergente.open(
      AlgrtmBoxComponent,
      { panelClass: 'emergente'}
    );

    const algrtm_visor_componente = (
      algrtm_visor_referencia.componentInstance
    );

    algrtm_visor_componente.secciones_colapsables = false;
    algrtm_visor_componente.algoritmo_id = this.algrtm_selecto;
    algrtm_visor_componente.loadAlgorithm();

    algrtm_visor_referencia.afterClosed().subscribe((result: any) => {
      this.algrtm_visor_apertura = !variable;
    });
  }

  set_algrtm_selected (valor: string | null) {
    this.algrtm_selecto = valor;

    if (valor) this.implementacion.algoritmo_id = valor;
  }

  set_paramz_algrtm_selected (valor: string | null) {
    this.paramz_algrtm_selecto = valor;

    if (valor) this.implementacion.parametrizacion_id = valor;
  }

  public esEditable ( ) {
    return (
      (
        (
          this.route.snapshot.paramMap.get('identificador') ||
          this.implementacion.implementacion_id
        ) &&
        this.acciones.actualizar_implementacion
      ) ||
      (
        this.acciones.crear_implementacion
      )
    );
  }

}