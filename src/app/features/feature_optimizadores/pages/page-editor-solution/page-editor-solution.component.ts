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
  AcademicReference,
} from '../../../feature_comunidad/models/academic-reference.model';

import {
  ArgumentoParametrizacion,
  Solucion,
} from '../../models/optimizador.model';

import {
  ImplmntPickerBoxComponent
} from '../../components/implmnt-picker-box/implmnt-picker-box.component';

import {
  ImplmntBoxComponent
} from '../../components/implmnt-box/implmnt-box.component';

import {
  ArgsImplmntPickerBoxComponent
} from '../../components/args-implmnt-picker-box/args-implmnt-picker-box.component';

import {
  InstcBoxComponent
} from '../../components/instc-box/instc-box.component';

import {
  InstcPickerBoxComponent
} from '../../components/instc-picker-box/instc-picker-box.component';

import {
  ArgsInstcPickerBoxComponent
} from '../../components/args-instc-picker-box/args-instc-picker-box.component';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-editor-solution',
  templateUrl: './page-editor-solution.component.html',
  styleUrls: ['./page-editor-solution.component.scss'],
})

export class PageEditorSolutionComponent implements OnInit {

  solucion: Solucion = new Solucion();
  acciones: Acciones = new Acciones();

  lenguajes_habilitados: string[] = [];
  codigo_vista: 'E' | 'P' = 'E';

  implmnt_selector_apertura: boolean = false;
  implmnt_visor_apertura: boolean = false;
  args_implmnt_selector_apertura: boolean = false;
  instc_selector_apertura: boolean = false;
  instc_visor_apertura: boolean = false;
  args_instc_selector_apertura: boolean = false;

  implmnt_selecto: string | null = null;
  paramz_implmnt_id_selected: string | null = null;
  args_implmnt_selecto: string | null = null;
  argumentacion_implmnt: ArgumentoParametrizacion = new ArgumentoParametrizacion();

  instc_selecto: string | null = null;
  paramz_instc_id_selected: string | null = null;
  args_instc_selecto: string | null = null;
  argumentacion_instc: ArgumentoParametrizacion = new ArgumentoParametrizacion();

  academicReferences: AcademicReference[] = [];
  academicReferencesAsoc: AcademicReference[] = [];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    public implmnt_selector_emergente: MatDialog,
    public implmnt_visor_emergente: MatDialog,
    public args_implmnt_selector_emergente: MatDialog,
    public instc_selector_emergente: MatDialog,
    public instc_visor_emergente: MatDialog,
    public args_instc_selector_emergente: MatDialog,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    await this.loadLangs();

    if (this.route.snapshot.paramMap.get('identificador') != null) {
      await this.loadActions();

      if (this.esEditable()) {
        await this.loadSolution();
      } else this.router.navigateByUrl('/');
    } else {
      await this.loadGeneralActions();
    }

    await this.reloadAcademicReferences();
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
          this.solucion.lenguaje_nombre = response.data[0];
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
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

          if (data.codificacion) {
            this.solucion.codigo_puntuado = data.codificacion;

            this.codigo_vista = 'P';
          }

          if (data.implementacion_id) {
            this.solucion.implementacion_id = data.implementacion_id;
            this.implmnt_selecto = data.implementacion_id;
          }

          if (data.argumentacion_solucion_id)
            this.solucion.argumentacion_implementacion_id = (
              data.argumentacion_solucion_id
            );
            this.args_implmnt_selecto = data.argumentacion_solucion_id;
            this.loadArgsImplmnt();

          if (data.instancia_id) {
            this.solucion.instancia_id = data.instancia_id;
            this.instc_selecto = data.instancia_id;
          }

          if (data.argumentacion_instancia_id)
            this.solucion.argumentacion_instancia_id = (
              data.argumentacion_instancia_id
            );
            this.args_instc_selecto = data.argumentacion_instancia_id;
            this.loadArgsInstc();
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  /**
  * Load argumentacion implementacion from API
  */
  async loadArgsImplmnt ( ) {
    if (!this.args_implmnt_selecto) return;

    await axios.get(
      environment.MYRMEX_API +
      '/argumentacion_solucion/identificador/' + this.args_implmnt_selecto
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data: any = response.data;

          if (data.diminutivo)
            this.argumentacion_implmnt.clave_id = data.diminutivo;

          if (data.diccionario_argumentos)
            this.argumentacion_implmnt.argumentos = data.diccionario_argumentos;

          if (data.parametrizacion_algoritmo_diminutivo)
            this.paramz_implmnt_id_selected = (
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
  * Load argumentacion instancia from API
  */
  async loadArgsInstc ( ) {
    if (!this.args_instc_selecto) return;

    await axios.get(
      environment.MYRMEX_API +
      '/argumentacion_instancia/identificador/' + this.args_instc_selecto
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data: any = response.data;

          if (data.diminutivo)
            this.argumentacion_instc.clave_id = data.diminutivo;

          if (data.diccionario_argumentos)
            this.argumentacion_instc.argumentos = data.diccionario_argumentos;

          if (data.parametrizacion_problema_diminutivo)
            this.paramz_instc_id_selected = (
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
  * Save solution from API
  */
  async saveSolution ( ) {
    if (this.no_es_guardable_solucion()) return;

    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.post(
      environment.MYRMEX_API + '/solucion/actualizar',
      this.solucion.build_post()
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.id) {
          this.router.navigateByUrl('/solucion/visor/' + response.data.diminutivo);
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
   * Load academic references from API
   */
  async loadAcademicReferences ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance, false);

    await axiosInstance.get(
      environment.MYRMEX_API + '/referentes',
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

  /**
   * Load academic references asoc from API
   */
  async loadAcademicReferencesAsoc ( ) {
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
          this.academicReferencesAsoc = response.data.map(
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

  get_codigo_conteo ( ) {
    return this.solucion.codigo_puntuado.split(/\r\n|\r|\n/).length;
  }

  no_es_guardable_solucion ( ): boolean {
    return (
      !this.solucion.implementacion_id ||
      !this.solucion.argumentacion_implementacion_id ||
      !this.solucion.instancia_id ||
      !this.solucion.argumentacion_instancia_id ||
      !this.solucion.titulo ||
      !this.solucion.lenguaje_nombre ||
      !this.solucion.codigo_puntuado
    );
  }

  set_implmnt_selector_apertura (variable: boolean) {
    this.implmnt_selector_apertura = variable;

    const implmnt_selector_referencia = this.implmnt_selector_emergente.open(
      ImplmntPickerBoxComponent,
      { panelClass: 'emergente-selector'}
    );

    const implmnt_selector_componente = (
      implmnt_selector_referencia.componentInstance
    );

    implmnt_selector_componente.implmnt_selecto = this.implmnt_selecto;
    implmnt_selector_componente.es_emergente = true;

    implmnt_selector_componente.emitir_seleccion.subscribe((result: any) => {
      if (result) this.set_implmnt_selected(result);

      this.implmnt_selector_apertura = !variable;
    });

    implmnt_selector_componente.emitir_parametros.subscribe((result: any) => {
      if (result) this.set_paramz_implmnt_id_selected(result);

      this.implmnt_selector_apertura = !variable;
    });

    implmnt_selector_referencia.afterClosed().subscribe((result: any) => {
      this.implmnt_selector_apertura = !variable;
    });
  }

  set_implmnt_visor_apertura (variable: boolean) {
    this.implmnt_visor_apertura = variable;

    const implmnt_visor_referencia = this.implmnt_visor_emergente.open(
      ImplmntBoxComponent,
      { panelClass: 'emergente'}
    );

    const implmnt_visor_componente = (
      implmnt_visor_referencia.componentInstance
    );

    implmnt_visor_componente.args_editables = false;
    implmnt_visor_componente.secciones_colapsables = false;

    implmnt_visor_componente.implementacion_id = this.implmnt_selecto;
    implmnt_visor_componente.loadImplementation();

    if (this.args_implmnt_selecto) {
      implmnt_visor_componente.args_id = this.args_implmnt_selecto;
      implmnt_visor_componente.loadArgs();
    }

    implmnt_visor_referencia.afterClosed().subscribe((result: any) => {
      this.implmnt_visor_apertura = !variable;
    });
  }

  set_implmnt_selected (valor: string | null) {
    this.implmnt_selecto = valor;

    if (valor) this.solucion.implementacion_id = valor;
  }

  set_paramz_implmnt_id_selected (valor: string | null) {
    this.paramz_implmnt_id_selected = valor;
  }

  set_args_implmnt_selector_apertura (variable: boolean) {
    if (!this.paramz_implmnt_id_selected) return;

    this.args_implmnt_selector_apertura = variable;

    const args_implmnt_selector_referencia = (
      this.args_implmnt_selector_emergente.open(
        ArgsImplmntPickerBoxComponent,
        { panelClass: 'emergente-selector'}
      )
    );

    const args_implmnt_selector_componente = (
      args_implmnt_selector_referencia.componentInstance
    );

    args_implmnt_selector_componente.paramz_algrtm_id = (
      this.paramz_implmnt_id_selected
    );

    args_implmnt_selector_componente.arg_selecto = this.args_implmnt_selecto;
    args_implmnt_selector_componente.es_editor = false;
    args_implmnt_selector_componente.es_emergente = true;
    args_implmnt_selector_componente.con_defecto = false;

    args_implmnt_selector_componente.emitir_seleccion.subscribe((result: any) => {
      if (result) this.set_args_implmnt_selected(result);

      this.implmnt_selector_apertura = !variable;
    });

    args_implmnt_selector_componente.emitir_argumentos.subscribe(
      (result: any) => {
        if (result) this.set_argumentacion_implementacion(result);

        this.implmnt_selector_apertura = !variable;
      }
    );

    args_implmnt_selector_referencia.afterClosed().subscribe((result: any) => {
      this.args_implmnt_selector_apertura = !variable;
    });
  }

  set_args_implmnt_selected (valor: string | null) {
    this.args_implmnt_selecto = valor;

    if (valor) this.solucion.argumentacion_implementacion_id = valor;
  }

  set_argumentacion_implementacion (valor: {[clave_param: string]: string}) {
    this.argumentacion_implmnt.argumentos = valor;
  }

  set_instc_selector_apertura (variable: boolean) {
    this.instc_selector_apertura = variable;

    const instc_selector_referencia = this.instc_selector_emergente.open(
      InstcPickerBoxComponent,
      { panelClass: 'emergente-selector'}
    );

    const instc_selector_componente = (
      instc_selector_referencia.componentInstance
    );

    instc_selector_componente.instc_selecto = this.instc_selecto;
    instc_selector_componente.es_emergente = true;

    instc_selector_componente.emitir_seleccion.subscribe((result: any) => {
      if (result) this.set_instc_selected(result);

      this.instc_selector_apertura = !variable;
    });

    instc_selector_componente.emitir_parametros.subscribe((result: any) => {
      if (result) this.set_paramz_instc_id_selected(result);

      this.instc_selector_apertura = !variable;
    });

    instc_selector_referencia.afterClosed().subscribe((result: any) => {
      this.instc_selector_apertura = !variable;
    });
  }

  set_instc_visor_apertura (variable: boolean) {
    this.instc_visor_apertura = variable;

    const instc_visor_referencia = this.instc_visor_emergente.open(
      InstcBoxComponent,
      { panelClass: 'emergente'}
    );

    const instc_visor_componente = instc_visor_referencia.componentInstance;

    instc_visor_componente.args_editables = false;
    instc_visor_componente.secciones_colapsables = false;

    instc_visor_componente.instancia_id = this.instc_selecto;
    instc_visor_componente.loadInstancia();

    if (this.args_instc_selecto) {
      instc_visor_componente.args_id = this.args_instc_selecto;
      instc_visor_componente.loadArgs();
    }

    instc_visor_referencia.afterClosed().subscribe((result: any) => {
      this.instc_visor_apertura = !variable;
    });
  }

  set_instc_selected (valor: string | null) {
    this.instc_selecto = valor;

    if (valor) this.solucion.instancia_id = valor;
  }

  set_paramz_instc_id_selected (valor: string | null) {
    this.paramz_instc_id_selected = valor;
  }

  set_args_instc_selector_apertura (variable: boolean) {
    if (!this.paramz_instc_id_selected) return;

    this.args_instc_selector_apertura = variable;

    const args_instc_selector_referencia = (
      this.args_instc_selector_emergente.open(
        ArgsInstcPickerBoxComponent,
        { panelClass: 'emergente-selector'}
      )
    );

    const args_instc_selector_componente = (
      args_instc_selector_referencia.componentInstance
    );

    args_instc_selector_componente.paramz_problm_id = (
      this.paramz_instc_id_selected
    );

    args_instc_selector_componente.arg_selecto = this.args_instc_selecto;
    args_instc_selector_componente.es_editor = false;
    args_instc_selector_componente.es_emergente = true;
    args_instc_selector_componente.con_defecto = false;

    args_instc_selector_componente.emitir_seleccion.subscribe((result: any) => {
      if (result) this.set_args_instc_selected(result);

      this.instc_selector_apertura = !variable;
    });

    args_instc_selector_componente.emitir_argumentos.subscribe(
      (result: any) => {
        if (result) this.set_argumentacion_instancia(result);

        this.instc_selector_apertura = !variable;
      }
    );

    args_instc_selector_referencia.afterClosed().subscribe((result: any) => {
      this.args_instc_selector_apertura = !variable;
    });
  }

  set_args_instc_selected (valor: string | null) {
    this.args_instc_selecto = valor;

    if (valor) this.solucion.argumentacion_instancia_id = valor;
  }

  set_argumentacion_instancia (valor: {[clave_param: string]: string}) {
    this.argumentacion_instc.argumentos = valor;
  }

  public esEditable ( ) {
    return (
      (
        (
          this.route.snapshot.paramMap.get('identificador') ||
          this.solucion.solucion_id
        ) &&
        this.acciones.actualizar_solucion
      ) ||
      (
        this.acciones.crear_solucion
      )
    );
  }

  public esAsociable (): boolean {
    return Boolean(
      this.route.snapshot.paramMap.get('identificador') ||
      this.solucion.solucion_id
    );
  }

  public getCredentId ( ): string | null {
    if (this.route.snapshot.paramMap.get('identificador')) {
      return this.route.snapshot.paramMap.get('identificador');
    }

    if (this.solucion.solucion_id) {
      return this.solucion.solucion_id;
    }

    return null;
  }

  public async reloadAcademicReferences ( ) {
    await this.loadAcademicReferences();
    
    if (this.esAsociable()) {
      await this.loadAcademicReferencesAsoc();
    } else {
      this.academicReferencesAsoc = [];
    }
  
  }

}