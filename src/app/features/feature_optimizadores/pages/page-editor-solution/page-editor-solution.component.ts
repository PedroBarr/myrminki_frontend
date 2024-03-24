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
  ImplmntBoxComponent
} from '../../components/implmnt-box/implmnt-box.component';

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

  constructor () { }

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

}