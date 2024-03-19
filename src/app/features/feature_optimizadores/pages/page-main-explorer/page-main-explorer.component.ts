import {
    Component,
    OnInit,
} from '@angular/core';

import axios from 'axios';

import { pageDescriptores } from '../../constants/descriptor.constant';

import {
  PrevisualizacionEntrada,
  PrevisualizacionAlgoritmo,
  PrevisualizacionImplementacion,
  PrevisualizacionProblema,
  PrevisualizacionInstancia,
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
                  n_implementaciones: (
                    optimizador.cantidad_implementaciones
                  ),
                });
              case 'IMPLEMENTACION':
                return new PrevisualizacionImplementacion({
                  ...objeto_base,
                  id: optimizador.clave_identificadora,
                  nombre_algoritmo: optimizador.algoritmo,
                  n_parametros_algoritmo: (
                    optimizador.parametrizacion_algoritmo_cantidad_parametros
                  ),
                  n_argumentaciones: optimizador.cantidad_argumentaciones,
                  n_soluciones: optimizador.cantidad_soluciones,
                  lenguaje_programacion: optimizador.lenguaje_programacion,
                });
              case 'PROBLEMA':
                return new PrevisualizacionProblema({
                  ...objeto_base,
                  id: optimizador.clave_identificadora,
                  n_parametros_problema: (
                    optimizador.parametrizacion_problema_cantidad_parametros
                  ),
                  n_instancias: (
                    optimizador.cantidad_instancias
                  ),
                });
              case 'INSTANCIA':
                return new PrevisualizacionInstancia({
                  ...objeto_base,
                  id: optimizador.clave_identificadora,
                  nombre_problema: optimizador.problema,
                  n_parametros_problema: (
                    optimizador.parametrizacion_problema_cantidad_parametros
                  ),
                  n_argumentaciones: optimizador.cantidad_argumentaciones,
                  n_soluciones: optimizador.cantidad_soluciones,
                  lenguaje_programacion: optimizador.lenguaje_programacion,
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