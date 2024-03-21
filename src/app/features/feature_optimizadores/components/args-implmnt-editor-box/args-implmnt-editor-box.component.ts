import {
  Component,
  Input,
} from '@angular/core';

import {
  MatDialogRef,
} from '@angular/material/dialog';

import axios from 'axios';

import { ArgumentoParametrizacion } from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-args-implmnt-editor-box',
  templateUrl: './args-implmnt-editor-box.component.html',
  styleUrls: ['./args-implmnt-editor-box.component.scss'],
})

export class ArgsImplmntEditorBoxComponent {

  @Input() argumentacion: ArgumentoParametrizacion = new ArgumentoParametrizacion();
  @Input() paramz_algrtm_id: string  = '';

  constructor (
    public emergente_referencia: MatDialogRef<ArgsImplmntEditorBoxComponent>,
  ) { }

  /**
  * Save argumentaciones from API
  */
  async saveArgs ( ) {
    if (!this.argumentacion.clave_id) return;
    if (!this.paramz_algrtm_id) return;

    await axios.post(
      environment.MYRMEX_API + '/parametrizacion_algoritmo/identificador/' +
        this.paramz_algrtm_id + '/argumentacion_solucion/actualizar',
      this.argumentacion.build_post()
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.id) {
          if (this.emergente_referencia) {
            this.emergente_referencia.close();
          }
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}