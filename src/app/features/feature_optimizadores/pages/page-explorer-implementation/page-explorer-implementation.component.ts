import {
    Component,
    OnInit,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  Implementacion,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-explorer-implementation',
  templateUrl: './page-explorer-implementation.component.html',
  styleUrls: ['./page-explorer-implementation.component.scss'],
})

export class PageExplorerImplementationComponent implements OnInit {

  implementacion: Implementacion = new Implementacion();

  descripcion_apertura: boolean = true;
  codigo_apertura: boolean = true;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit ( ) {
    this.loadImplementation();
  }

  set_descripcion_apertura (variable: boolean) {
    this.descripcion_apertura = variable;
  }

  set_codigo_apertura (variable: boolean) {
    this.codigo_apertura = variable;
  }

  /**
  * Load implementation from API
  */
  async loadImplementation ( ) {
    axios.get(
      environment.MYRMEX_API +
        '/implementacion/identificador/' +
        this.route.snapshot.paramMap.get('identificador'),
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          const data = response.data;

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

        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}