import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-calif-box',
  templateUrl: './calif-box.component.html',
  styleUrls: ['./calif-box.component.scss']
})
export class CalifBoxComponent implements OnChanges, OnInit {

  calificacion_personal: number | null = null;
  calificacion_personal_interna: number = 0;
  calificacion_global: number = 0;

  @Input() credencial: string | null = null;
  @Input() es_calificable: boolean = false;

  @Output() emitirCalificacion = new EventEmitter<void>();

  constructor(
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit() {
    if (this.credencial) {
      await this.loadCalif();
    }
  }

  async ngOnChanges(changes: any) {
    if (changes.credencial) {
      await this.loadCalif();
    }
  }

  /**
   * Load calif from API
   */
  async loadCalif ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance, false);

    await axiosInstance.get(
      environment.MYRMEX_API + '/calificaciones/' + this.credencial
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          if (response.data.calif_glbl)
            this.calificacion_global = response.data.calif_glbl;

          if (response.data.calif_prsnl !== undefined) {
            this.calificacion_personal = response.data.calif_prsnl;
            this.calificacion_personal_interna = response.data.calif_prsnl;
          }
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
   * Do calif from API
   */
  async doCalif (obj: any) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance, false);

    await axiosInstance.post(
      environment.MYRMEX_API + '/calificacion/calificar',
        obj
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.loadCalif();
          this.emitirCalificacion.emit();
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

  public verificar ( ) {
    if (this.esCalificable()) {
      if (
        this.calificacion_personal_interna >= 0 &&
        this.calificacion_personal_interna <= 5
      ) {
        const obj: any = {}

        obj['credencial'] = this.credencial;
        obj['calificacion'] = this.calificacion_personal_interna;

        this.doCalif(obj);
      }
    }
  }

  esCalificable ( ) {
    return (
      this.es_calificable &&
      this.credencial &&
      !this.esCalificadoPersonal()
    );
  }

  esCalificadoGlobal ( ) {
    return this.calificacion_global !== null;
  }

  esCalificadoPersonal ( ) {
    return this.calificacion_personal !== null;
  }

}
