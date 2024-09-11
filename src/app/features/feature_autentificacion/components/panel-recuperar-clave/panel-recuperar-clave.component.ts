import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';


import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-panel-recuperar-clave',
  templateUrl: './panel-recuperar-clave.component.html',
  styleUrls: ['./panel-recuperar-clave.component.scss']
})
export class PanelRecuperarClaveComponent implements OnInit {

  usuario: string = '';
  mensaje: string = '';

  es_error: boolean = false;

  @Input() es_emitible: boolean = false;
  @Output() emitir_datos_validados = new EventEmitter<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit(): void {
  }
  
  private esCorreo (exp: string): boolean {
    let expCorreo = new RegExp('^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');
    return expCorreo.test(exp);
  }

  verificar ( ) {
    this.ocultar_mensaje();

    if (this.usuario) {
      let dict = {};

      if (this.esCorreo(this.usuario))
        dict = {'correo': this.usuario,};
      else
        dict = {'apodo': this.usuario,};

      if (this.es_emitible) this.emitir_datos_validados.emit(dict);
      else this.doRecoup(dict);

    } else {
      this.asignar_error('Complete los datos');
    }
  }

  es_mostrar_mensaje ( ): boolean {
    return !(this.mensaje == '');
  }

  ocultar_mensaje ( ) {
    this.mensaje = '';
    this.es_error = false;
  }

  asignar_error (error: string) {
    this.mensaje = error;
    this.es_error = true;
  }

  asignar_exito (exito: string) {
    this.mensaje = exito;
    this.es_error = false;
  }

  obtener_clase_mensaje ( ): string {
    return this.es_error ? 'alert-danger' : 'alert-success';
  }

  /**
  * Do recoup from API
  */
  async doRecoup (obj: any) {
    await axios.post(
      environment.MYRMEX_API + '/sigul_recobrar',
      obj,
    )
      .then(response => {
        console.log(response.data);

        if (response.data['mensaje'])
          this.asignar_exito(response.data['mensaje']);
        else
          this.asignar_error('No se pudo recuperar la clave');
      })
      .catch(error => {
        console.error(error);

        if (error.response && error.response.data)
          this.asignar_error(Object.keys(error.response.data).join(', '));
        else
          this.asignar_error('No se pudo recuperar la clave');
      })
      .finally(( ) => { });
  }

}
