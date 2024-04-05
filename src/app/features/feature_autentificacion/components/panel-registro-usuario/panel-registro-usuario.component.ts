import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import { AuthenticationStorage } from 'src/app/shared/guard/auth.guard';
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

  mensaje: string = '';

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
    let expApodo = new RegExp('^[^0-9][^@#]\w+$');
    return expApodo.test(exp);
  }

  verificar ( ) {
    this.mensaje = '';

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
              'nombre': this.nombre,
              'apellido': this.apellido,
              'apodo': this.apodo,
              'correo': this.correo,
              'clave': this.clave
            };

            if (this.es_emitible) this.emitir_datos_validados.emit(dict);
            else this.doSignUp(dict);
          } else
          this.mensaje = 'Las claves no coinciden';

        } else
          this.mensaje = 'Ingrese un apodo valido';

      } else
        this.mensaje = 'Ingrese un correo valido';

    } else
      this.mensaje = 'Complete los datos';
  }

  es_mostrar_mensaje ( ): boolean {
    return !(this.mensaje == '');
  }

  ocultar_mensaje ( ) {
    this.mensaje = '';
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

        /*
        if (response.data && response.data['Simbolismo']) {
          this.authStorage.login(response.data['Simbolismo'])

          this.router.navigateByUrl('/perfil')
        } else
          this.mensaje = Object.keys(response.data).join(', ');
        */
      })
      .catch(error => {
        console.error(error);

        if (error.response && error.response.data)
          this.mensaje = Object.keys(error.response.data).join(', ');
      })
      .finally(( ) => { });
  }

}