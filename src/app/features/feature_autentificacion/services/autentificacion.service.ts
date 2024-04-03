import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


@Injectable()
export class AutentificacionService {

  constructor (private http: HttpClient) { }

  errorHandler (err: HttpErrorResponse){
    if (err.status === 401) {
      this.delToken();
    }
    return throwError(
      err.message ||
      'Error [Auth]: ' + 'Inhabilitado para completar la petición.'
    );
  }

  setToken (token_valido: string) {
    localStorage.setItem('simbolismo', token_valido);
    window.location.reload();
  }

  getToken (): string {
    return localStorage.getItem('simbolismo') || "";
  }

  delToken ( ) {
    this.setToken('');
    localStorage.removeItem('simbolismo');
  }

  getHeader ( ): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken()
    });
  }

  estaEnSesion ( ): boolean {
    return (this.getToken()) ? true : false;
  }
/*
  getValidacionAutentificacion (dict: any): Observable<any> {
    return this.http
      .post<string>(`${environment.MYRMEX_API}/signin`, dict)
      .pipe(catchError(this.errorHandler));
  }

  getAgregarAutentificacion (dict: any): Observable<any> {
    return this.http
      .post<string>(`${environment.MYRMEX_API}/signup`, dict)
      .pipe(catchError(this.errorHandler));
  }

  setInvalidarSesion ( ): Observable<any> {
    let headers = this.getHeader();
    return this.http
      .post<string>(`${environment.MYRMEX_API}/signout`, {'headers': headers})
      .pipe(catchError(this.errorHandler));
  }
*/
}