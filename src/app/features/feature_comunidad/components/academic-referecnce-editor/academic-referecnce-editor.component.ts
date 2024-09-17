import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import {
  AcademicReference,
  TipoContenidoEnum,
} from '../../models/academic-reference.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-academic-referecnce-editor',
  templateUrl: './academic-referecnce-editor.component.html',
  styleUrls: ['./academic-referecnce-editor.component.scss']
})
export class AcademicReferecnceEditorComponent {

  @Input() refrt_selecto: AcademicReference = <AcademicReference>{};
  @Input() es_emergente: boolean = false;

  @Output() emitirClausura: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  getTipoContenido ( ): string[] {
    return Object.values(TipoContenidoEnum);
  }

  getAnhoClase ( ): string {
    if (this.refrt_selecto.tipo_contenido === TipoContenidoEnum.web) {
      return 'boxW100';
    }
    return 'boxW30';
  }

  esTituloSecundarioVisible ( ): boolean {
    return Boolean(this.refrt_selecto.tipo_contenido);
  }

  verificar() {
    if (this.refrt_selecto.tipo_contenido) {
      if (this.refrt_selecto.validarModelo()) {
        this.doSaveReferente();
      }
    }
  }

  /**
   * Do Save Referente
   */
  private async doSaveReferente () {
    const axiosInstance = axios.create();
    
    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);
    
    await axiosInstance.post(
        environment.MYRMEX_API + '/referente/actualizar',
        this.refrt_selecto.toJSON(),
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data["id"])
          this.emitirClausura.emit(false);
      })
      .catch(error => {
        console.error(error);

        this.emitirClausura.emit(false);
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

  public conmutarEsModif( ) {
    this.refrt_selecto.apa_reference = null;
  }

}
