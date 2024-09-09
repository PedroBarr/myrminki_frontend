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
  Implementacion,
  Instancia,
  Solucion,
} from '../../models/optimizador.model';

import {
  Acciones,
} from '../../models/acciones.model';

import {
  ImplmntBoxComponent
} from '../../components/implmnt-box/implmnt-box.component';

import {
  InstcBoxComponent
} from '../../components/instc-box/instc-box.component';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-solution',
  templateUrl: './page-explorer-solution.component.html',
  styleUrls: ['./page-explorer-solution.component.scss'],
})

export class PageExplorerSolutionComponent implements OnInit {

  solucion: Solucion = new Solucion();
  acciones: Acciones = new Acciones();

  implementacion: Implementacion = new Implementacion();
  instancia: Instancia = new Instancia();

  inspector_apertura: boolean = true;
  codigo_apertura: boolean = true;

  implementacion_apertura: boolean = false;
  instancia_apertura: boolean = false;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    public implementacion_emergente: MatDialog,
    public instancia_emergente: MatDialog,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    await this.loadSolution();
    await this.loadActions();
  }

  set_inspector_apertura (variable: boolean) {
    this.inspector_apertura = variable;
  }

  set_codigo_apertura (variable: boolean) {
    this.codigo_apertura = variable;
  }

  set_implementacion_apertura (variable: boolean) {
    this.implementacion_apertura = variable;

    const implementacion_referencia = this.implementacion_emergente.open(
      ImplmntBoxComponent,
      { panelClass: 'emergente' }
    );

    const implementacion_componente = (
      implementacion_referencia.componentInstance
    );

    implementacion_componente.implementacion = this.implementacion;
    implementacion_componente.args_editables = false;

    implementacion_componente.args_id = (
      this.solucion.argumentacion_implementacion_id
    );

    implementacion_componente.loadArgs();
    implementacion_componente.secciones_colapsables = false;

    implementacion_referencia.afterClosed().subscribe(result => {
      this.implementacion_apertura = !variable;
    });
  }

  set_instancia_apertura (variable: boolean) {
    this.instancia_apertura = variable;

    const instancia_referencia = this.instancia_emergente.open(
      InstcBoxComponent,
      { panelClass: 'emergente' }
    );

    const instancia_componente = instancia_referencia.componentInstance;
    instancia_componente.instancia = this.instancia;
    instancia_componente.args_editables = false;

    instancia_componente.args_id = (
      this.solucion.argumentacion_instancia_id
    );

    instancia_componente.loadArgs();
    instancia_componente.secciones_colapsables = false;

    instancia_referencia.afterClosed().subscribe(result => {
      this.instancia_apertura = !variable;
    });
  }

  /**
  * Load solution from API
  */
  async loadSolution ( ) {
    await axios.get(
      environment.MYRMEX_API +
        '/solucion/identificador/' +
        this.route.snapshot.paramMap.get('identificador'),
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;

          if (data.diminutivo)
            this.solucion.solucion_id = data.diminutivo;

          if (data.nombre)
            this.solucion.titulo = data.nombre;

          if (data.etiquetas)
            this.solucion.etiquetas = data.etiquetas.map(
              (etiqueta: any) => etiqueta.etiqueta
            );

          if (data.lenguaje_nombre)
            this.solucion.lenguaje_nombre = data.lenguaje_nombre;

          if (data.codificacion)
            this.solucion.codigo_puntuado = data.codificacion;

          if (data.implementacion_id) {
            this.solucion.implementacion_id = data.implementacion_id;
            this.implementacion.implementacion_id = data.implementacion_id;
            this.loadImplementation();
          }

          if (data.argumentacion_solucion_id)
            this.solucion.argumentacion_implementacion_id = (
              data.argumentacion_solucion_id
            );

          if (data.instancia_id) {
            this.solucion.instancia_id = data.instancia_id;
            this.instancia.instancia_id = data.instancia_id;
            this.loadInstancia();
          }

          if (data.argumentacion_instancia_id)
            this.solucion.argumentacion_instancia_id = (
              data.argumentacion_instancia_id
            );
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
    axios.get(
      environment.MYRMEX_API +
        '/implementacion/identificador/' +
          this.implementacion.implementacion_id,
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
  * Load instancia from API
  */
  async loadInstancia ( ) {
    axios.get(
      environment.MYRMEX_API +
        '/instancia/identificador/' + this.instancia.instancia_id,
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
        '/solucion/identificador/' +
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

  public esEditable ( ) {
    return (
      this.solucion.solucion_id &&
      this.acciones.actualizar_solucion
    );
  }

  public esEjecutableComando ( ) {
    return (
      this.solucion.solucion_id &&
      this.acciones.ejecutar_comando_solucion
    );
  }

  public esEjecutable ( ) {
    return (
      this.solucion.solucion_id &&
      this.solucion.implementacion_id &&
      this.solucion.argumentacion_implementacion_id &&
      this.acciones.ejecutar_solucion
    );
  }

  public esAccionable ( ) {
    return (
      !this.acciones.esVacio( )
    );
  }

}