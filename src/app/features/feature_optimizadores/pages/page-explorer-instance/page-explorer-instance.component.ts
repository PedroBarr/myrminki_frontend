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
  Instancia,
} from '../../models/optimizador.model';

import {
  Acciones,
} from '../../models/acciones.model';

import {
  AcademicReference,
} from '../../../feature_comunidad/models/academic-reference.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-instance',
  templateUrl: './page-explorer-instance.component.html',
  styleUrls: ['./page-explorer-instance.component.scss'],
})

export class PageExplorerInstanceComponent implements OnInit {

  instancia: Instancia = new Instancia();
  acciones: Acciones = new Acciones();

  academicReferences: AcademicReference[] = [];

  arg_selecto: string | null = null;
  args_editados: {[clave_param: string]: string} = {};
  arg_selecto_argumentos: {[clave_param: string]: string} = {};

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    await this.loadInstancia();
    await this.loadActions();
    await this.loadAcademicReferences();
  }

  /**
  * Load instancia from API
  */
  async loadInstancia ( ) {
    await axios.get(
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

  /**
   * Load actions from API
   */
  async loadActions ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API +
        '/instancia/identificador/' +
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

  set_arg_selecto (valor: string | null) {
    this.arg_selecto = valor;
  }

  set_args_editados (valor: {[clave_param: string]: string}) {
    this.args_editados = valor;
  }

  set_arg_selecto_argumentos (valor: {[clave_param: string]: string}) {
    this.arg_selecto_argumentos = valor;
  }

  public esEditable ( ) {
    return (
      this.instancia.instancia_id &&
      this.acciones.actualizar_instancia
    );
  }

  public esEjecutableComando ( ) {
    return (
      this.instancia.instancia_id &&
      this.acciones.ejecutar_comando_instancia
    );
  }

  public esPublicableArgumentos ( ) {
    return Boolean(
      this.instancia.instancia_id &&
      this.acciones.publicar_argumentos_instancia
    );
  }

  public esCalificable ( ): boolean {
    return Boolean(
      this.instancia.instancia_id &&
      this.acciones.calificar_instancia
    );
  }

  public getIdentificador ( ) {
    if (this.instancia.instancia_id)
      return this.instancia.instancia_id;
    else if (this.route.snapshot.paramMap.get('identificador'))
      return this.route.snapshot.paramMap.get('identificador');
    else
      return null;
  }

}