import {
  Injectable,
  inject,
} from '@angular/core';

import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivateFn,
} from '@angular/router';


import {
  HttpErrorResponse,
} from '@angular/common/http';

import {
  AxiosInstance,
  AxiosError,
} from 'axios';

import { environment } from 'src/environments/environment';


/* Claves de la guarda */
const myrmex_autentificacion_simbolica = 'jwt_myrmex';
export const ruta_inicio_sesion = '/iniciar_sesion';
const ruta_perfil = '/perfil';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationStorage {

  private _storage: Storage | null = null;

  constructor( ) {
    this.init();
  }

  async init() {
    this._storage = localStorage;
  }

  public async set(key: string, value: any) {
    if (typeof value === 'object')
      this._storage?.setItem(key, JSON.stringify(value));
    else
      this._storage?.setItem(key, value);
  }

  public get(key: string) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '{}');
      return value;
    } catch (error) {
      return this._storage?.getItem(key);
    }
  }

  public async remove(key: string) {
    this._storage?.removeItem(key);
  }

  public async clear() {
    this._storage?.clear();
  }

  async login (simbolismo: string) {
    await this.set(myrmex_autentificacion_simbolica, simbolismo);
  }

  async logout ( ) {
    await this.remove(myrmex_autentificacion_simbolica);
  }

}

@Injectable({
    providedIn: 'root',
})
class AuthenticationGuard {

  constructor(
    private authStorage: AuthenticationStorage
  ) { }

  validateKey(key: any): boolean {
    let stored_value;

    // VALIDATION WITH KEY
    if (typeof key === 'string') {
      stored_value = inject(AuthenticationStorage).get(key);

    } else if (typeof key === 'object') {
      stored_value = inject(AuthenticationStorage).get(key[0]);

      for (let i_next_key = 1; i_next_key < key.length; i_next_key++) {
        stored_value = stored_value[key[i_next_key]];
      }
    }

    if (typeof stored_value === 'object' && Object.keys(stored_value).length === 0) return false;

    return (stored_value !== null && stored_value !== undefined && stored_value !== '' && stored_value !== 'null' && stored_value !== 'undefined');
  }

  validateKeyValue(key: any): any {
    let stored_value;

    // VALIDATION WITH KEY
    if (typeof key === 'string') {
      stored_value = inject(AuthenticationStorage).get(key);

    } else if (typeof key === 'object') {
      stored_value = inject(AuthenticationStorage).get(key[0]);

      for (let i_next_key = 1; i_next_key < key.length; i_next_key++) {
        stored_value = stored_value[key[i_next_key]];
      }
    }

    if (typeof stored_value === 'object' && Object.keys(stored_value).length === 0) return null;

    return (stored_value !== null && stored_value !== undefined && stored_value !== '' && stored_value !== 'null' && stored_value !== 'undefined') ? stored_value : null;
  }

  canActive(keys: any): boolean {
    for (const key of keys) {
      if (!this.validateKey(key)) {
        return false;
      }
    }

    return true;
  }

  canActiveValue(validations: any): boolean {
    for (const validate_item of validations) {
      if (this.validateKeyValue(validate_item.key) !== validate_item.value) {
        return false;
      }
    }

    return true;
  }

}

@Injectable({
    providedIn: 'root',
})
export class AutentificacionInterceptorService {

  constructor(
    private authStorage: AuthenticationStorage,
    private router: Router,
  ) { }


  async delAuth (incl_redir: boolean = true) {
    await this.authStorage.logout();
    if (incl_redir) this.router.navigateByUrl(ruta_inicio_sesion);
  }

  async setAuth (simbolismo: string) {
    await this.authStorage.login(simbolismo);
    window.location.reload();
  }

  getAuth (): string | null {
    const simbolismo = this.authStorage.get(myrmex_autentificacion_simbolica);
    if (typeof simbolismo === 'string') return simbolismo;
    else return null;
  }


  useAuthHeaders (config: any): any {
    const simbolismo = this.getAuth();
    if (simbolismo) config.headers.Authorization = `Bearer ${simbolismo}`;
    return config;
  }

  handleAuthError (
    err: AxiosError,
    incl_redir: boolean = true,
  ) {
    const status: number = err.response ? err.response.status : 0;

    switch (status) {
      case 401:
        this.delAuth(incl_redir);
        break;
    }

    return Promise.reject(err);
  }


  addAuthInterceptor (axios: AxiosInstance): number {
    return axios.interceptors.request.use((config: any) => {
      this.useAuthHeaders(config);
      return config;
    });
  }

  removeAuthInterceptor (axios: AxiosInstance, interceptor: number) {
    return axios.interceptors.request.eject(interceptor);
  }


  addAuthErrorInterceptor (
    axios: AxiosInstance,
    incl_redir: boolean = true,
  ): number {
    return axios.interceptors.response.use(
      response => response,
      error => {
        return this.handleAuthError(error, incl_redir);
      },
    );
  }

  removeAuthErrorInterceptor (axios: AxiosInstance, interceptor: number) {
    return axios.interceptors.response.eject(interceptor);
  }

}


export const restrictorNecesitaAutenticar: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const activo = inject(AuthenticationGuard).canActive([myrmex_autentificacion_simbolica]);

  if (!activo) {
    inject(Router).navigateByUrl(ruta_inicio_sesion);
  }
  return activo;
};

export const restrictorNecesitaNoAutenticar: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const activo = inject(AuthenticationGuard).canActive([myrmex_autentificacion_simbolica]);

  if (activo) {
    inject(Router).navigateByUrl(ruta_perfil);
  }
  return !activo;
};