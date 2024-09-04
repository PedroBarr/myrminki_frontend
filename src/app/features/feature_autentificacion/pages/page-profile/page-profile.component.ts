import {
  Component,
  OnInit,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import {
  UsuarioPerfil,
  UsuarioPerfilVistaHabilitada,
} from '../../models/usuario.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss'],
})

export class PageProfileComponent implements OnInit {

  public perfil: UsuarioPerfil = new UsuarioPerfil();
  public tipo_vista: UsuarioPerfilVistaHabilitada =
    UsuarioPerfilVistaHabilitada.none;

  constructor (
    private authIntercepService: AutentificacionInterceptorService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit ( ) {
    if (this.route.snapshot.paramMap.get('id') != null) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) await this.loadUserProfile(id);
    } else {
      await this.loadProfile();
    }
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
          this.tipo_vista = UsuarioPerfilVistaHabilitada.profile;
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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
   * Load user profile from API
   */
  async loadUserProfile (id: string) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    axiosInstance.get(
      environment.MYRMEX_API + '/perfil/apodo/' + id,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.perfil = new UsuarioPerfil(response.data);
          this.tipo_vista = UsuarioPerfilVistaHabilitada.user;
        }
      })
      .catch(error => {
        console.error(error);

        this.reiniciarVista();
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

  private reiniciarVista ( ) {
    this.perfil = new UsuarioPerfil();
    this.tipo_vista = UsuarioPerfilVistaHabilitada.none;
  }

  public getSubtitulo ( ): string {
    switch (this.tipo_vista) {
      case UsuarioPerfilVistaHabilitada.profile:
        return 'Perfil';
      case UsuarioPerfilVistaHabilitada.user:
        return 'Usuario';
      default:
        return '';
    }
  }

  public esCorreoVisible ( ): boolean {
    return this.tipo_vista === UsuarioPerfilVistaHabilitada.profile;
  }

  public esCerrarSesionVisible ( ): boolean {
    return this.tipo_vista === UsuarioPerfilVistaHabilitada.profile;
  }

}