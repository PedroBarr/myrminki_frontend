import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {
  ruta_inicio_sesion,
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

@Component({
  selector: 'myrmex-actions-warning-box',
  templateUrl: './actions-warning-box.component.html',
  styleUrls: ['./actions-warning-box.component.scss']
})
export class ActionsWarningBoxComponent implements OnInit {

  constructor(
    private router: Router,
    private autentificacion: AutentificacionInterceptorService,
  ) { }

  ngOnInit(): void {
  }

  private esAutenticado(): boolean {
    return this.autentificacion.getAuth() !== null;
  }

  /**
   * Funcion que permite definir el modo de renderizado
   * de la caja de advertencia.
   * 
   * 0: Modo de advertencia inicie sesion para ver contenido.
   * 1: Modo de advertencia solicite permisos para ver contenido.
   * 
   * @returns {Number} Modo de renderizado.
   */
  public modoRenderizado(): Number {
    if (this.esAutenticado()) {
      return 1;
    } else {
      return 0;
    }
  }

  public irInicioSesion(): void {
    this.router.navigate([ruta_inicio_sesion]);
  }

}
