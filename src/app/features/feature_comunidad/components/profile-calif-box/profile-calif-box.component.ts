import {
  Component,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';

import axios from 'axios';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-profile-calif-box',
  templateUrl: './profile-calif-box.component.html',
  styleUrls: ['./profile-calif-box.component.scss']
})
export class ProfileCalifBoxComponent implements OnChanges, OnInit {

  calificacion_algoritmos: number = 0;
  calificacion_problemas: number = 0;
  calificacion_implementaciones: number = 0;
  calificacion_instancias: number = 0;
  calificacion_soluciones: number = 0;

  @Input() apodo: string | null = null;
  
  constructor() { }

  async ngOnInit() {
    if (this.apodo) {
      await this.loadCalif();
    }
  }

  async ngOnChanges(changes: any) {
    if (changes.apodo) {
      await this.loadCalif();
    }
  }

  /**
   * Load calif from API
   */
  async loadCalif ( ) {
    const axiosInstance = axios.create();

    await axiosInstance.get(
      environment.MYRMEX_API + '/calificaciones/usuario/' + this.apodo,
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          if (response.data.calif_algrtm)
            this.calificacion_algoritmos = response.data.calif_algrtm;
          
          if (response.data.calif_implmnt)
            this.calificacion_implementaciones = response.data.calif_implmnt;

          if (response.data.calif_instc)
            this.calificacion_instancias = response.data.calif_instc;

          if (response.data.calif_problm)
            this.calificacion_problemas = response.data.calif_problm;

          if (response.data.calif_solcn)
            this.calificacion_soluciones = response.data.calif_solcn;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

}
