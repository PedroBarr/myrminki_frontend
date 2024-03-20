import {
    Component,
    OnInit,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  Solucion,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-solution',
  templateUrl: './page-explorer-solution.component.html',
  styleUrls: ['./page-explorer-solution.component.scss'],
})

export class PageExplorerSolutionComponent implements OnInit {

  solucion: Solucion = new Solucion();

  inspector_apertura: boolean = true;
  codigo_apertura: boolean = true;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit ( ) {
    this.loadSolution();
  }

  set_inspector_apertura (variable: boolean) {
    this.inspector_apertura = variable;
  }

  set_codigo_apertura (variable: boolean) {
    this.codigo_apertura = variable;
  }

  /**
  * Load solution from API
  */
  async loadSolution ( ) {
    axios.get(
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

          if (data.implementacion_id)
            this.solucion.implementacion_id = data.implementacion_id;

          if (data.argumentacion_solucion_id)
            this.solucion.argumentacion_implementacion_id = (
              data.argumentacion_solucion_id
            );

          if (data.instancia_id)
            this.solucion.instancia_id = data.instancia_id;

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

}