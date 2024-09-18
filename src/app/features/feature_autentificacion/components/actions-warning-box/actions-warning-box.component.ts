import {
  Component,
  Input,
  OnInit
} from '@angular/core';

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

  @Input() modo_alternativo: Number = -1;
  @Input() forzar_modo: boolean = false;

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
    if (this.forzar_modo && this.modo_alternativo != -1) {
      return this.modo_alternativo;
    }

    if (this.esAutenticado()) {
      if (this.modo_alternativo != -1) {
        return this.modo_alternativo;
      }

      return 1;
    } else {
      return 0;
    }
  }

  public irInicioSesion(): void {
    this.router.navigate([ruta_inicio_sesion]);
  }

  public getTitulo(): string {
    switch (this.modoRenderizado()) {
      case 0:
      case 1:
      default:
        return 'Contenido bloqueado';
      case 2:
        return 'Contenido no disponible';
    }
  }

  public getMensaje(): string {
    switch (this.modoRenderizado()) {
      case 0:
        return 'Debe iniciar sesion para ver este contenido';
      case 1:
        return 'No tiene permisos para ver parte de este contenido';
      case 2:
      default:
        return 'El contenido no está disponible';
    }
  }

  public getIcono(): string {
    switch (this.modoRenderizado()) {
      case 0:
        return 'person';
      case 1:
        return 'workspace_premium';
      case 2:
      default:
        return 'wifi_tethering_error';
    }
  }

}
