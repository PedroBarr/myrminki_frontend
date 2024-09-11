import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import { AuthenticationStorage } from 'src/app/shared/guards/auth.guard';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-panel-registro-usuario',
  templateUrl: './panel-registro-usuario.component.html',
  styleUrls: ['./panel-registro-usuario.component.scss'],
})
export class PanelRegistroUsuarioComponent {

  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  apodo: string = '';
  clave: string = '';
  clave_confirmacion: string = '';
  
  minCaracteresApodo: number = 7;

  mensaje: string = '';
  es_error: boolean = false;

  claveVisible: boolean = false;
  claveConfirmacionVisible: boolean = false;

  @Input() es_emitible: boolean = false;
  @Output() emitir_datos_validados = new EventEmitter<any>();

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  private esCorreo (exp: string): boolean {
    let expCorreo = new RegExp('^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');
    return expCorreo.test(exp);
  }

  private esApodo (exp: string): boolean {
    if (exp.length < this.minCaracteresApodo) return false;
    let expApodo = new RegExp('^[A-Za-z0-9._%-]+$');
    return expApodo.test(exp);
  }

  mostrarCaracteresValidosApodo ( ): string {
    return (
      'Los caracteres válidos son: ' +
      'letras mayúsculas y minúsculas, ' +
      'números, ' +
      'punto (.), ' +
      'guion bajo (_) ' +
      'y guion medio (-)' +
      '; y deben tener al menos ' +
      this.minCaracteresApodo +
      ' caracteres.'
    );
  }

  verificar ( ) {
    this.ocultar_mensaje();

    if (
      this.nombre &&
      this.apellido &&
      this.correo &&
      this.apodo &&
      this.clave &&
      this.clave_confirmacion
    ) {
      let dict = {};

      if (this.esCorreo(this.correo)) {
        if (this.esApodo(this.apodo)) {
          if (this.clave == this.clave_confirmacion) {
            dict = {
              'nombres': this.nombre,
              'apellidos': this.apellido,
              'apodo': this.apodo,
              'correo': this.correo,
              'clave': this.clave
            };

            if (this.es_emitible) this.emitir_datos_validados.emit(dict);
            else this.doSignUp(dict);
          } else
          this.setMensajeError('Las claves no coinciden');

        } else
          this.setMensajeError('Ingrese un apodo valido');

      } else
        this.setMensajeError('Ingrese un correo valido');

    } else
      this.setMensajeError('Complete los datos');
  }

  es_mostrar_mensaje ( ): boolean {
    return !(this.mensaje == '');
  }

  ocultar_mensaje ( ) {
    this.setMensajeError('');
  }

  /**
  * so sign up from API
  */
  async doSignUp (obj: any) {
    axios.post(
      environment.MYRMEX_API + '/sigul_arribo',
      obj,
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data['Respuesta'])
          this.setMensajeExito(response.data['Respuesta']);
        else
          this.setMensajeError(Object.keys(response.data).join(', '));
      })
      .catch(error => {
        console.error(error);

        if (error.response && error.response.data)
          this.setMensajeError(Object.keys(error.response.data).join(', '));
      })
      .finally(( ) => { });
  }

  setMensajeError (mensaje: string) {
    this.mensaje = mensaje;
    this.es_error = true;
  }

  setMensajeExito (mensaje: string) {
    this.mensaje = mensaje;
    this.es_error = false;
  }

  getClaseMensaje ( ): string {
    return this.es_error ? 'mensaje-error' : 'mensaje-exito';
  }

}