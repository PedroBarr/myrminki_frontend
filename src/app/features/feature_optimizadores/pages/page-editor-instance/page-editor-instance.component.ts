import {
    Component,
    OnInit,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  Instancia
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-editor-instance',
  templateUrl: './page-editor-instance.component.html',
  styleUrls: ['./page-editor-instance.component.scss'],
})

export class PageEditorInstanceComponent implements OnInit {

  instancia: Instancia = new Instancia();

  lenguajes_habilitados: string[] = [];
  descripcion_vista: 'E' | 'P' = 'E';
  matematizacion_vista: 'E' | 'P' = 'E';
  codigo_vista: 'E' | 'P' = 'E';

  problm_selector_apertura: boolean = false;
  problm_visor_apertura: boolean = false;

  problm_selecto: string | null = null;
  paramz_problm_selecto: string | null = null;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    public problm_selector_emergente: MatDialog,
    public problm_visor_emergente: MatDialog,
  ) { }

  async ngOnInit ( ) {
    await this.loadLangs();

    if (this.route.snapshot.paramMap.get('identificador') != null)
      this.loadInstance();
  }

  /**
  * Load languages from API
  */
  async loadLangs ( ) {
    axios.get(
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
          this.instancia.lenguaje_nombre = response.data[0];
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  /**
  * Load instance from API
  */
  async loadInstance ( ) {
    axios.get(
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
  * Save instance from API
  */
  async saveInstance ( ) {
    if (this.no_es_guardable_instancia()) return;

    await axios.post(
      environment.MYRMEX_API + '/instancia/actualizar',
      this.instancia.build_post()
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.id) {
          this.router.navigateByUrl('/instancia/' + response.data.diminutivo);
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
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

  no_es_guardable_instancia ( ): boolean {
    return (
      !this.instancia.problema_id ||
      !this.instancia.titulo ||
      !this.instancia.lenguaje_nombre ||
      !this.instancia.descripcion_puntuada ||
      !this.instancia.matematizacion_puntuada ||
      !this.instancia.codigo_puntuado
    );
  }

  /*
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
  */

}