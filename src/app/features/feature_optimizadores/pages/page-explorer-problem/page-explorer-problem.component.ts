import {
    Component,
    OnInit,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  Problema,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-problem',
  templateUrl: './page-explorer-problem.component.html',
  styleUrls: ['./page-explorer-problem.component.scss'],
})

export class PageExplorerProblemComponent implements OnInit {

  problema: Problema = new Problema();

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit ( ) {
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

          if (data.descripcion)
            this.problema.descripcion_puntuada = data.descripcion;

          if (data.matematizacion)
            this.problema.matematizacion_puntuada = data.matematizacion;

          if (data.parametrizacion_problema_diminutivo)
            this.problema.parametrizacion_id = (
              data.parametrizacion_problema_diminutivo
            );

        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}