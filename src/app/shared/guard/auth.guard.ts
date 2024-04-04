import { Injectable, inject } from '@angular/core';

import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivateFn,
} from '@angular/router';


import { environment } from 'src/environments/environment';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

/* Claves de la guarda */
const myrmex_autentificacion_simbolica = 'jwt_myrmex';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationStorage {

  private _storage: Storage | null = null;

  constructor(
      private storage: Storage,
  ) {
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

  logout ( ) {
    this.remove(myrmex_autentificacion_simbolica);
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
      if (!this.validateToken(key)) {
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

export const canActivateAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const active = inject(AuthenticationGuard).canActive([myrmex_autentificacion_simbolica]);
  if (!active) {
    inject(Router).navigateByUrl('/iniciar_sesion');
  }
  return active;
};