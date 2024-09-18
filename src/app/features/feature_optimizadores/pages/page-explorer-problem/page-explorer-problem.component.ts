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
  Problema,
} from '../../models/optimizador.model';

import {
  Acciones,
} from '../../models/acciones.model';

import {
  AcademicReference,
} from '../../../feature_comunidad/models/academic-reference.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-problem',
  templateUrl: './page-explorer-problem.component.html',
  styleUrls: ['./page-explorer-problem.component.scss'],
})

export class PageExplorerProblemComponent implements OnInit {

  problema: Problema = new Problema();
  acciones: Acciones = new Acciones();

  academicReferences: AcademicReference[] = [];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    await this.loadProblem();
    await this.loadActions();
    await this.loadAcademicReferences();
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

          if (data.etiquetas)
            this.problema.etiquetas = data.etiquetas.map(
              (etiqueta: any) => etiqueta.etiqueta
            );

          if (data.descripcion)
            this.problema.descripcion_puntuada = data.descripcion;

          if (data.matematizacion)
            this.problema.matematizacion_puntuada = data.matematizacion;

          if (data.parametrizacion_problema_diminutivo)
            this.problema.parametrizacion_id = (
              data.parametrizacion_problema_diminutivo
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
   * Load solution academic references from API
   */
  async loadAcademicReferences ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance, false);

    await axiosInstance.get(
      environment.MYRMEX_API +
        '/referente/optimizador/' +
        this.route.snapshot.paramMap.get('identificador'),
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.length) {
          this.academicReferences = response.data.map(
            (referente: any) => AcademicReference.fromJSON(referente)
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

  public esEditable ( ) {
    return (
      this.problema.problema_id &&
      this.acciones.actualizar_problema
    );
  }

}