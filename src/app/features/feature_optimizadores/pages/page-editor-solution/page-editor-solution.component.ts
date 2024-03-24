import {
    Component,
    OnInit,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  Solucion,
} from '../../models/optimizador.model';

import {
  ImplmntPickerBoxComponent
} from '../../components/implmnt-picker-box/implmnt-picker-box.component';

import {
  InstcBoxComponent
} from '../../components/instc-box/instc-box.component';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-editor-solution',
  templateUrl: './page-editor-solution.component.html',
  styleUrls: ['./page-editor-solution.component.scss'],
})

export class PageEditorSolutionComponent implements OnInit {

  solucion: Solucion = new Solucion();

  lenguajes_habilitados: string[] = [];

  codigo_vista: 'E' | 'P' = 'E';

  implmnt_selector_apertura: boolean = false;

  implmnt_selecto: string | null = null;

  constructor (
    public implmnt_selector_emergente: MatDialog,
  ) { }

  async ngOnInit ( ) {
    await this.loadLangs();
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
          this.solucion.lenguaje_nombre = response.data[0];
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
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

    implmnt_selector_referencia.afterClosed().subscribe((result: any) => {
      if (result) this.set_implmnt_selected(result);

      this.implmnt_selector_apertura = !variable;
    });
  }

  set_implmnt_selected (valor: string | null) {
    this.implmnt_selecto = valor;

    if (valor) this.solucion.implementacion_id = valor;
  }

}