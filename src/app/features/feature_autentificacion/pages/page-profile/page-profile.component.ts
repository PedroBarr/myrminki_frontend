import {
  Component,
  OnInit,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import {
  UsuarioPerfil,
  UsuarioPerfilVistaHabilitada,
} from '../../models/usuario.model';

import {
  PermisoTipado,
  FactoriaPermisosTipados,
} from '../../models/permisos.model';

import {
  PrevisualizacionProblema,
  PrevisualizacionAlgoritmo,
  PrevisualizacionInstancia,
  PrevisualizacionImplementacion,
  PrevisualizacionSolucion,
} from '../../../feature_optimizadores/models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss'],
})

export class PageProfileComponent implements OnInit {

  public perfil: UsuarioPerfil = new UsuarioPerfil();
  public tipo_vista: UsuarioPerfilVistaHabilitada =
    UsuarioPerfilVistaHabilitada.none;

  public permisos: PermisoTipado[] = [];

  public problemas: PrevisualizacionProblema[] = [];
  public algoritmos: PrevisualizacionAlgoritmo[] = [];

  public instancias: PrevisualizacionInstancia[] = [];
  public implementaciones: PrevisualizacionImplementacion[] = [];

  public soluciones: PrevisualizacionSolucion[] = [];

  constructor (
    private authIntercepService: AutentificacionInterceptorService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit ( ) {
    if (this.route.snapshot.paramMap.get('id') != null) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        await this.loadUserProfile(id);
        await this.loadUserProfilePermissions(id);
        await this.loadUserProfileProblems(id);
        await this.loadUserProfileAlgorithms(id);
        await this.loadUserProfileInstances(id);
        await this.loadUserProfileImplementations(id);
        await this.loadUserProfileSolutions(id);
      }
    } else {
      await this.loadProfile();
      await this.loadProfilePermissions();
      await this.loadProfileProblems();
      await this.loadProfileAlgorithms();
      await this.loadProfileInstances();
      await this.loadProfileImplementations();
      await this.loadProfileSolutions();
    }
  }

  /**
  * Load profile from API
  */
  private async loadProfile ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/perfil',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.perfil = new UsuarioPerfil(response.data);
          this.tipo_vista = UsuarioPerfilVistaHabilitada.profile;
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load user profile from API
   */
  private async loadUserProfile (id: string) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/perfil/apodo/' + id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.perfil = new UsuarioPerfil(response.data);
          this.tipo_vista = UsuarioPerfilVistaHabilitada.user;
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
  * Do signout from API
  */
  public async doSignout ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/sigul_sale',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.authIntercepService.delAuth();
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
   * Load profile permissions from API
   */
  private async loadProfilePermissions ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/permisos/perfil',
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.roles) {
          this.permisos = this.buildPermisos(response.data.roles);
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
   * Load user profile permissions from API
   */
  private async loadUserProfilePermissions (id: string) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/permisos/perfil/apodo/' + id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.roles) {
          this.permisos = this.buildPermisos(response.data.roles);
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
   * Load profile problems from API
   */
  private async loadProfileProblems ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/problemas/perfil',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.problemas = this.buildProblemas(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load user profile problems from API
   */
  private async loadUserProfileProblems (id: string) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/problemas/perfil/apodo/' + id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.problemas = this.buildProblemas(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load profile algorithms from API
   */
  private async loadProfileAlgorithms ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/algoritmos/perfil',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.algoritmos = this.buildAlgoritmos(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load user profile algorithms from API
   */
  private async loadUserProfileAlgorithms (id: string) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/algoritmos/perfil/apodo/' + id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.algoritmos = this.buildAlgoritmos(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load profile instances from API
   */
  private async loadProfileInstances ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/instancias/perfil',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.instancias = this.buildInstancias(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load user profile instances from API
   */
  private async loadUserProfileInstances (id: string) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/instancias/perfil/apodo/' + id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.instancias = this.buildInstancias(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load profile implementations from API
   */
  private async loadProfileImplementations ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/implementaciones/perfil',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.implementaciones = this.buildImplementaciones(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load user profile implementations from API
   */
  private async loadUserProfileImplementations (id: string) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/implementaciones/perfil/apodo/' + id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.implementaciones = this.buildImplementaciones(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load profile solutions from API
   */
  private async loadProfileSolutions ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/soluciones/perfil',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.soluciones = this.buildSoluciones(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load user profile solutions from API
   */
  private async loadUserProfileSolutions (id: string) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/soluciones/perfil/apodo/' + id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.soluciones = this.buildSoluciones(response.data);
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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

  private reiniciarVista ( ) {
    this.perfil = new UsuarioPerfil();
    this.tipo_vista = UsuarioPerfilVistaHabilitada.none;
  }

  public getSubtitulo ( ): string {
    switch (this.tipo_vista) {
      case UsuarioPerfilVistaHabilitada.profile:
        return 'Perfil';
      case UsuarioPerfilVistaHabilitada.user:
        return 'Usuario';
      default:
        return '';
    }
  }

  public esCorreoVisible ( ): boolean {
    return this.tipo_vista === UsuarioPerfilVistaHabilitada.profile;
  }

  public esCerrarSesionVisible ( ): boolean {
    return this.tipo_vista === UsuarioPerfilVistaHabilitada.profile;
  }

  private buildPermisos (permisos_data: any): PermisoTipado[] {
    const permisos: PermisoTipado[] = [];
    permisos_data.forEach((permiso_data: any) => {
      const data = {nombre: permiso_data};
      const permiso = FactoriaPermisosTipados.crearPermiso(data);
      if (permiso) {
        permisos.push(permiso);
      }
    });
    return permisos;
  }

  public esRolesVisible ( ): boolean {
    return this.permisos.length > 0;
  }

  private buildProblemas (problemas: any): PrevisualizacionProblema[] {
    return problemas.map((problema: any) => new PrevisualizacionProblema({
      id: problema.clave_identificadora,
      titulo_entrada: problema.nombre,
      etiquetas: problema.etiquetas.map((etiqueta: any) => etiqueta.etiqueta),
      n_parametros_problema: (
        problema.parametrizacion_problema_cantidad_parametros
      ),
      n_instancias: problema.cantidad_instancias,
    }));
  }

  private buildAlgoritmos (algoritmos: any): PrevisualizacionAlgoritmo[] {
    return algoritmos.map((algoritmo: any) => new PrevisualizacionAlgoritmo({
      id: algoritmo.clave_identificadora,
      titulo_entrada: algoritmo.nombre,
      etiquetas: algoritmo.etiquetas.map((etiqueta: any) => etiqueta.etiqueta),
      n_parametros: algoritmo.parametrizacion_algoritmo_cantidad_parametros,
      n_implementaciones: algoritmo.cantidad_implementaciones,
    }));
  }

  private buildInstancias (instancias: any): PrevisualizacionInstancia[] {
    return instancias.map((instancia: any) => new PrevisualizacionInstancia({
      id: instancia.clave_identificadora,
      titulo_entrada: instancia.nombre,
      etiquetas: instancia.etiquetas.map((etiqueta: any) => etiqueta.etiqueta),
      nombre_problema: instancia.problema,
      n_parametros_problema: (
        instancia.parametrizacion_problema_cantidad_parametros
      ),
      n_argumentaciones: instancia.cantidad_argumentaciones,
      n_soluciones: instancia.cantidad_soluciones,
      lenguaje_programacion: instancia.lenguaje_programacion,
    }));
  }

  private buildImplementaciones (
    implementaciones: any
  ): PrevisualizacionImplementacion[] {
    return implementaciones.map((implementacion: any) =>
      new PrevisualizacionImplementacion({
        id: implementacion.clave_identificadora,
        titulo_entrada: implementacion.nombre,
        etiquetas: implementacion.etiquetas.map(
          (etiqueta: any) => etiqueta.etiqueta
        ),
        nombre_algoritmo: implementacion.algoritmo,
        n_parametros_algoritmo: (
          implementacion.parametrizacion_algoritmo_cantidad_parametros
        ),
        n_argumentaciones: implementacion.cantidad_argumentaciones,
        n_soluciones: implementacion.cantidad_soluciones,
        lenguaje_programacion: implementacion.lenguaje_programacion,
      })
    );
  }

  private buildSoluciones (soluciones: any): PrevisualizacionSolucion[] {
    return soluciones.map((solucion: any) => new PrevisualizacionSolucion({
      id: solucion.clave_identificadora,
      titulo_entrada: solucion.nombre,
      etiquetas: solucion.etiquetas.map((etiqueta: any) => etiqueta.etiqueta),
      lenguaje_programacion: solucion.lenguaje_programacion,
      nombre_algoritmo: solucion.algoritmo,
      n_parametros_algoritmo: (
        solucion.parametrizacion_algoritmo_cantidad_parametros
      ),
      lenguaje_programacion_implementacion: (
        solucion.implementacion_lenguaje_programacion
      ),
      nombre_problema: solucion.problema,
      n_parametros_problema: (
        solucion.parametrizacion_problema_cantidad_parametros
      ),
      lenguaje_programacion_instancia: solucion.instancia_lenguaje_programacion,
    }));
  }

}