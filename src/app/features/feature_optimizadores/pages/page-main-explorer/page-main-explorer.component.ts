import {
    Component,
    OnInit,
} from '@angular/core';

import axios from 'axios';

import { pageDescriptores } from '../../constants/descriptor.constant';

import {
  PrevisualizacionEntrada,
  PrevisualizacionAlgoritmo,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-main-explorer',
  templateUrl: './page-main-explorer.component.html',
  styleUrls: ['./page-main-explorer.component.scss'],
})

export class PageMainExplorerComponent implements OnInit {

  pageDescriptor: string = pageDescriptores['explorar'];

  etiquetasBuscadas: any[] = [];
  optimizadores: PrevisualizacionEntrada[] = [];

  ngOnInit ( ) {
    this.loadOptimizers();
  }

  /**
  * Load optimizers from API
  */
  async loadOptimizers ( ) {
    axios.get(
      environment.MYRMEX_API + '/explorar',
      {
        params: {
          etiquetas: this.etiquetasBuscadas.map(etiqueta => etiqueta.id).join(','),
        }
      }
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.length !== undefined && response.data.length !== null) {
          this.optimizadores = response.data.map((optimizador: any) => {
            const objeto_base = {
              titulo_entrada: optimizador.nombre,
              etiquetas: optimizador.etiquetas.map(
                  (etiqueta: any) => etiqueta.etiqueta
                ),
            };

            switch (optimizador.categoria_optimizador) {
              case 'ALGORITMO':
                return new PrevisualizacionAlgoritmo({
                  ...objeto_base,
                  id: optimizador.clave_identificadora,
                  n_parametros: (
                    optimizador.parametrizacion_algoritmo_cantidad_parametros
                  ),
                });
              default:
                return new PrevisualizacionEntrada({
                  ...objeto_base,
                });
            }
          });
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  seleccionEtiqueta(evt: any) {
    this.etiquetasBuscadas.push(evt);
    this.loadOptimizers();
  }

  remocionEtiqueta(evt: any) {
    this.etiquetasBuscadas = this.etiquetasBuscadas.filter(etiqueta => etiqueta.id != evt);
    this.loadOptimizers();
  }

}