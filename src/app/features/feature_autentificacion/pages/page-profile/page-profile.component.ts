import {
  Component,
  OnInit,
} from '@angular/core';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import {
  UsuarioPerfil,
} from '../../models/usuario.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss'],
})

export class PageProfileComponent implements OnInit {

  public perfil: UsuarioPerfil = new UsuarioPerfil();

  constructor (
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    await this.loadProfile();
  }

  /**
  * Load profile from API
  */
  async loadProfile ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    axiosInstance.get(
      environment.MYRMEX_API + '/perfil',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.perfil = new UsuarioPerfil(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => {
        this.authIntercepService.removeAuthInterceptor(
          axiosInstance,
          intercep_auth_id
        );

        this.authIntercepService.removeAuthErrorInterceptor(
          axiosInstance,
          intercep_error_id
        );
      });
  }

  /**
  * Do signout from API
  */
  async doSignout ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    axiosInstance.get(
      environment.MYRMEX_API + '/sigul_sale',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.authIntercepService.delAuth();
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => {
        this.authIntercepService.removeAuthInterceptor(
          axiosInstance,
          intercep_auth_id
        );

        this.authIntercepService.removeAuthErrorInterceptor(
          axiosInstance,
          intercep_error_id
        );
      });
  }

}