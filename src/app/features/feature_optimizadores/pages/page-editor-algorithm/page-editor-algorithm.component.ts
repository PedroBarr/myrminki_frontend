import {
    Component,
    OnInit,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  Algoritmo,
  ParametrizacionEditable,
} from '../../models/optimizador.model';

import { Etiqueta } from '../../models/etiqueta.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-editor-algorithm',
  templateUrl: './page-editor-algorithm.component.html',
  styleUrls: ['./page-editor-algorithm.component.scss'],
})

export class PageEditorAlgorithmComponent implements OnInit {

  algoritmo: Algoritmo = new Algoritmo();

  parametrizacion_id: string | null = null;
  paramz_algrtm: ParametrizacionEditable = new ParametrizacionEditable();
  etiquetas: Etiqueta[] = [];

  descripcion_vista: 'E' | 'P' = 'E';
  matematizacion_vista: 'E' | 'P' = 'E';
  seudo_codigo_vista: 'E' | 'P' = 'E';

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit ( ) {
    if (this.route.snapshot.paramMap.get('identificador') != null)
      this.loadAlgorithm();
  }

  /**
  * Load algorithm from API
  */
  async loadAlgorithm ( ) {
    axios.get(
      environment.MYRMEX_API +
        '/algoritmo/identificador/' +
        this.route.snapshot.paramMap.get('identificador'),
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;

          if (data.diminutivo)
            this.algoritmo.algoritmo_id = data.diminutivo;

          if (data.nombre)
            this.algoritmo.titulo = data.nombre;

          if (data.etiquetas) {
            this.algoritmo.etiquetas = data.etiquetas.map(
              (etiqueta: any) => etiqueta.etiqueta
            );

            this.etiquetas = data.etiquetas.map(
              (tipo_algoritmo: any) => ({
                id: tipo_algoritmo.id,
                etiqueta: tipo_algoritmo.etiqueta,
                descripcion: tipo_algoritmo.descripcion,
              } as Etiqueta)
            );
          }

          if (data.descripcion) {
            this.algoritmo.descripcion_puntuada = data.descripcion;

            this.descripcion_vista = 'P';
          }

          if (data.matematizacion) {
            this.algoritmo.matematizacion_puntuada = data.matematizacion;

            this.matematizacion_vista = 'P';
          }

          if (data.seudo_codigo) {
            this.algoritmo.seudo_codigo_puntuado = data.seudo_codigo;

            this.seudo_codigo_vista = 'P';
          }

          if (data.parametrizacion_algoritmo_diminutivo) {
            this.algoritmo.parametrizacion_id = (
              data.parametrizacion_algoritmo_diminutivo
            );

            this.parametrizacion_id = data.parametrizacion_algoritmo_diminutivo;
          }
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  /**
  * Save algorithm from API
  */
  async saveAlgorithm ( ) {
    if (this.no_es_guardable_algoritmo()) return;

    const post_data = this.algoritmo.build_post();

    post_data['parametrizacion'] = this.paramz_algrtm.build_post(
      this.algoritmo.algoritmo_id ? post_data['id'] : post_data['diminutivo'],
      this.parametrizacion_id ? this.parametrizacion_id : null
    );

    post_data['tipificacion'] = this.etiquetas.map(
      (etiqueta: any) => {
        const etiqueta_obj = new Etiqueta();
        etiqueta_obj.fill_obj(etiqueta);
        return etiqueta_obj.build_post()
      }
    );

    await axios.post(
      environment.MYRMEX_API + '/algoritmo/actualizar',
      post_data,
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.id) {
          this.router.navigateByUrl(
            '/algoritmo/visor/' +
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

  toggle_seudo_codigo_vista ( ) {
    switch (this.seudo_codigo_vista) {
      case 'E':
        this.seudo_codigo_vista = 'P';
        break;
      case 'P':
        this.seudo_codigo_vista = 'E';
        break;
    }
  }

  no_es_guardable_algoritmo ( ): boolean {
    return (
      !this.algoritmo.titulo ||
      !this.algoritmo.descripcion_puntuada ||
      !this.algoritmo.matematizacion_puntuada ||
      !this.algoritmo.seudo_codigo_puntuado ||
      !this.paramz_algrtm.params_list.length ||
      this.paramz_algrtm.params_list.length == 0
    );
  }

  update_paramz (paramz: ParametrizacionEditable) {
    this.paramz_algrtm = paramz;
  }

  remove_etiqueta (etiqueta_id: string) {
    this.etiquetas = this.etiquetas.filter(
      (etiqueta: Etiqueta) => etiqueta.id != etiqueta_id
    );
  }

}