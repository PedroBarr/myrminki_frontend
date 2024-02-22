import {
    Component,
    OnInit,
} from '@angular/core';

import axios from 'axios';

import { pageDescriptores } from '../../constants/descriptor.constant';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-main-explorer',
  templateUrl: './page-main-explorer.component.html',
  styleUrls: ['./page-main-explorer.component.scss'],
})

export class PageMainExplorerComponent implements OnInit {

  pageDescriptor: string = pageDescriptores['explorar'];

  etiquetasBuscadas: any[] = [];
  optimizadores: string[] = [];

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
          this.optimizadores = response.data.map((optimizador: any) =>
            optimizador.nombre
          );
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