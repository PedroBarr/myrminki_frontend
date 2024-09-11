import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-panel-inicio-sesion',
  templateUrl: './panel-inicio-sesion.component.html',
  styleUrls: ['./panel-inicio-sesion.component.scss'],
})
export class PanelInicioSesionComponent {

  usuario: string = '';
  clave: string = '';
  mensaje: string = '';

  claveVisible: boolean = false;

  @Input() es_emitible: boolean = false;
  @Output() emitir_datos_validados = new EventEmitter<any>();

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  private esCorreo (exp: string): boolean {
    let expCorreo = new RegExp('^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');
    return expCorreo.test(exp);
  }

  verificar ( ) {
    this.mensaje = '';
    if (this.usuario && this.clave) {
      let dict = {};

      if (this.esCorreo(this.usuario))
        dict = {'correo': this.usuario, 'clave': this.clave};
      else
        dict = {'apodo': this.usuario, 'clave': this.clave};

      if (this.es_emitible) this.emitir_datos_validados.emit(dict);
      else this.doSignIn(dict);

    } else {
      this.mensaje = 'Complete los datos';
    }
  }

  es_mostrar_mensaje ( ): boolean {
    return !(this.mensaje == '');
  }

  ocultar_mensaje ( ) {
    this.mensaje = '';
  }

  /**
  * Do sign in from API
  */
  async doSignIn (obj: any) {
    axios.post(
      environment.MYRMEX_API + '/sigul_ingreso',
      obj,
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data['Simbolismo']) {
          this.authIntercepService.setAuth(response.data['Simbolismo'])

          this.router.navigateByUrl('/perfil')
        } else
          this.mensaje = Object.keys(response.data).join(', ');
      })
      .catch(error => {
        console.error(error);

        if (error.response && error.response.data)
          this.mensaje = Object.keys(error.response.data).join(', ');
      })
      .finally(( ) => { });
  }

}