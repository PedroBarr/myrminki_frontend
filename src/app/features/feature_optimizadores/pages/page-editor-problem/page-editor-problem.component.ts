import {
    Component,
    OnInit,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  Problema,
  ParametrizacionEditable,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-editor-problem',
  templateUrl: './page-editor-problem.component.html',
  styleUrls: ['./page-editor-problem.component.scss'],
})

export class PageEditorProblemComponent implements OnInit {

  problema: Problema = new Problema();

  parametrizacion_id: string | null = null;
  paramz_problm: ParametrizacionEditable = new ParametrizacionEditable();

  descripcion_vista: 'E' | 'P' = 'E';
  matematizacion_vista: 'E' | 'P' = 'E';

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit ( ) {
    if (this.route.snapshot.paramMap.get('identificador') != null)
      this.loadProblem();
  }

  /**
  * Load problem from API
  */
  async loadProblem ( ) {
    axios.get(
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

          if (data.descripcion) {
            this.problema.descripcion_puntuada = data.descripcion;

            this.descripcion_vista = 'P';
          }

          if (data.matematizacion) {
            this.problema.matematizacion_puntuada = data.matematizacion;

            this.matematizacion_vista = 'P';
          }

          if (data.parametrizacion_problema_diminutivo) {
            this.problema.parametrizacion_id = (
              data.parametrizacion_problema_diminutivo
            );

            this.parametrizacion_id = data.parametrizacion_problema_diminutivo;
          }
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  /**
  * Save problem from API
  */
  async saveProblem ( ) {
    if (this.no_es_guardable_problema()) return;

    const post_data = this.problema.build_post();

    post_data['parametrizacion'] = this.paramz_problm.build_post(
      this.problema.problema_id ? post_data['id'] : post_data['diminutivo'],
      this.parametrizacion_id ? this.parametrizacion_id : null
    );

    await axios.post(
      environment.MYRMEX_API + '/problema/actualizar',
      post_data,
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.id) {
          this.router.navigateByUrl(
            '/problema/visor/' +
            response.data.diminutivo
          );
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

  no_es_guardable_problema ( ): boolean {
    return (
      !this.problema.titulo ||
      !this.problema.descripcion_puntuada ||
      !this.problema.matematizacion_puntuada ||
      !this.paramz_problm.params_list.length ||
      this.paramz_problm.params_list.length == 0
    );
  }

  update_paramz (paramz: ParametrizacionEditable) {
    this.paramz_problm = paramz;
  }

}