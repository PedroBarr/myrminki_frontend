import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import axios from 'axios';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-panel-cambio-clave',
  templateUrl: './panel-cambio-clave.component.html',
  styleUrls: ['./panel-cambio-clave.component.scss']
})
export class PanelCambioClaveComponent implements OnInit {

  clave: string = '';
  confirmacion: string = '';

  clave_visible: boolean = false;
  confirmacion_visible: boolean = false;

  mensaje: string = '';
  es_error: boolean = false;

  @Input() simbolismo: string | null = null;
  @Input() es_emitible: boolean = false;
  @Output() emitir_datos_validados = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  verificar ( ) {
    this.ocultarMensaje();

    if (this.clave && this.confirmacion) {
      let dict = {};

      if (this.esSimbolico())
        dict = {'simbolismo': this.simbolismo};

      if (this.esConfirmacionValida())
        dict = {'clave': this.clave, 'confirmacion': this.confirmacion};
      else {
        this.asignarError('Las claves no coinciden');
        return;
      }

      if (this.es_emitible) this.emitir_datos_validados.emit(dict);
      else this.doSwapup(dict);

    } else {
      this.asignarError('Complete los datos');
    }
  }

  esConfirmacionValida ( ): boolean {
    return this.clave === this.confirmacion;
  }

  esMensajeVisible ( ): boolean {
    return !(this.mensaje == '');
  }

  ocultarMensaje ( ) {
    this.mensaje = '';
    this.es_error = false;
  }

  asignarError (error: string) {
    this.mensaje = error;
    this.es_error = true;
  }

  asignarExito (exito: string) {
    this.mensaje = exito;
    this.es_error = false;
  }

  obtener_clase_mensaje ( ): string {
    return this.es_error ? 'alert-danger' : 'alert-success';
  }

  esSimbolico ( ) {
    return this.simbolismo !== '' && this.simbolismo !== null;
  }

  tituloComponente ( ) {
    return this.esSimbolico() ? 'Recuperación de clave' : 'Cambio de clave';
  }

  subtituloComponente ( ) {
    return this.esSimbolico() ? 'Ingrese una nueva clave' : 'Ingrese su nueva clave y valide la anterior';
  }

  botonComponente ( ) {
    return this.esSimbolico() ? 'Recuperar' : 'Cambiar';
  }

  voltearClaveVisible ( ) {
    this.clave_visible = !this.clave_visible;
  }

  voltearConfirmacionVisible ( ) {
    this.confirmacion_visible = !this.confirmacion_visible;
  }

  /**
  * Do swapup from API
  */
  async doSwapup (obj: any) {
    await axios.post(
      environment.MYRMEX_API + '/sigul_reconfigurar',
      obj,
    )
      .then(response => {
        console.log(response.data);

        if (response.data['Respuesta'])
          this.asignarExito(response.data['Respuesta']);
        else
          this.asignarError('No se pudo cambiar la clave');
      })
      .catch(error => {
        console.error(error);

        if (error.response && error.response.data)
          this.asignarError(Object.keys(error.response.data).join(', '));
        else
          this.asignarError('No se pudo cambiar la clave');
      })
      .finally(( ) => { });
  }

}
