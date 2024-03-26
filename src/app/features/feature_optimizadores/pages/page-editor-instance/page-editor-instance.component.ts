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

import {
  ProblmBoxComponent
} from '../../components/problm-box/problm-box.component';

import {
  ProblmPickerBoxComponent
} from '../../components/problm-picker-box/problm-picker-box.component';

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

          if (data.descripcion) {
            this.instancia.descripcion_puntuada = data.descripcion;

            this.descripcion_vista = 'P';
          }

          if (data.matematizacion) {
            this.instancia.matematizacion_puntuada = data.matematizacion;

            this.matematizacion_vista = 'P';
          }

          if (data.codificacion) {
            this.instancia.codigo_puntuado = data.codificacion;

            this.codigo_vista = 'P';
          }

          if (data.parametrizacion_problema_identificador) {
            this.instancia.parametrizacion_id = (
              data.parametrizacion_problema_identificador
            );

            this.paramz_problm_selecto = (
              data.parametrizacion_problema_identificador
            );
          }

          if (data.problema_diminutivo) {
            this.instancia.problema_id = (
              data.problema_diminutivo
            );

            this.problm_selecto = data.problema_diminutivo;
          }

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
          this.router.navigateByUrl('/instancia/visor/' + response.data.diminutivo);
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

  set_problm_selector_apertura (variable: boolean) {
    this.problm_selector_apertura = variable;

    const problm_selector_referencia = this.problm_selector_emergente.open(
      ProblmPickerBoxComponent,
      { panelClass: 'emergente-selector'}
    );

    const problm_selector_componente = (
      problm_selector_referencia.componentInstance
    );

    problm_selector_componente.problm_selecto = this.problm_selecto;
    problm_selector_componente.es_emergente = true;

    problm_selector_componente.emitir_seleccion.subscribe((result: any) => {
      if (result) this.set_problm_selected(result);

      this.problm_selector_apertura = !variable;
    });

    problm_selector_componente.emitir_parametros.subscribe((result: any) => {
      if (result) this.set_paramz_problm_selected(result);

      this.problm_selector_apertura = !variable;
    });

    problm_selector_referencia.afterClosed().subscribe((result: any) => {
      this.problm_selector_apertura = !variable;
    });
  }

  set_problm_visor_apertura (variable: boolean) {
    this.problm_visor_apertura = variable;

    const problm_visor_referencia = this.problm_visor_emergente.open(
      ProblmBoxComponent,
      { panelClass: 'emergente'}
    );

    const problm_visor_componente = (
      problm_visor_referencia.componentInstance
    );

    problm_visor_componente.secciones_colapsables = false;
    problm_visor_componente.problema_id = this.problm_selecto;
    problm_visor_componente.loadProblema();

    problm_visor_referencia.afterClosed().subscribe((result: any) => {
      this.problm_visor_apertura = !variable;
    });
  }

  set_problm_selected (valor: string | null) {
    this.problm_selecto = valor;

    if (valor) this.instancia.problema_id = valor;
  }

  set_paramz_problm_selected (valor: string | null) {
    this.paramz_problm_selecto = valor;

    if (valor) this.instancia.parametrizacion_id = valor;
  }

}