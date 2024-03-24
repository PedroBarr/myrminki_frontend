import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import axios from 'axios';

import {
  PrevisualizacionImplementacion
} from '../../models/optimizador.model';

import {
  ImplmntBoxComponent
} from '../../components/implmnt-box/implmnt-box.component';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-implmnt-picker-box',
  templateUrl: './implmnt-picker-box.component.html',
  styleUrls: ['./implmnt-picker-box.component.scss'],
})

export class ImplmntPickerBoxComponent implements OnInit {

  implementaciones: PrevisualizacionImplementacion[] = [];

  implmnt_editor_apertura: boolean = false;

  @Input() implmnt_selecto: string | null = null;
  @Input() es_emergente: boolean = false;
  @Output() emitir_seleccion = new EventEmitter<string | null>();

  constructor (
    public implmnt_editor_emergente: MatDialog,
  ) { }

  async ngOnInit ( ) {
    await this.loadImplmnts();
  }

  /**
  * Load implementaciones from API
  */
  async loadImplmnts ( ) {
    await axios.get(
      environment.MYRMEX_API + '/implementaciones/explorar'
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.implementaciones = response.data.map(
            (implementacion: any, i_implmnt: number) => {
              const {
                nombre: titulo_entrada,
                clave_identificadora: id,
                algoritmo: nombre_algoritmo,
                parametrizacion_algoritmo_cantidad_parametros: n_parametros_algoritmo,
                cantidad_argumentaciones: n_argumentaciones,
                cantidad_soluciones: n_soluciones,
                lenguaje_programacion,
              } = implementacion;

              const etiquetas = implementacion.etiquetas.map(
                (etiqueta: any) => etiqueta.etiqueta
              );

              return new PrevisualizacionImplementacion({
                titulo_entrada,
                etiquetas,
                id,
                nombre_algoritmo,
                n_parametros_algoritmo,
                n_argumentaciones,
                n_soluciones,
                lenguaje_programacion,
              });
            }
          );
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  set_implmnt_editor_apertura (variable: boolean) {
    if (this.implmnt_selecto == null) return;

    this.implmnt_editor_apertura = variable;

    const implmnt_editor_referencia = this.implmnt_editor_emergente.open(
      ImplmntBoxComponent,
      { panelClass: 'emergente'}
    );

    const implmnt_editor_componente = (
      implmnt_editor_referencia.componentInstance
    );

    /*
    implmnt_editor_componente.implementacion = this.implementacion;
    implmnt_editor_componente.args_editables = false;
    implmnt_editor_componente.secciones_colapsables = false;
    */

    implmnt_editor_referencia.afterClosed().subscribe((result: any) => {
      this.implmnt_editor_apertura = !variable;
    });
  }

  set_implmnt_selected (valor: string | null) {
    this.implmnt_selecto = valor;
    this.emitir_seleccion.emit(this.implmnt_selecto);

    /*
    const arg_selecto: ArgumentoParametrizacion | undefined = (
      this.args_paramz.find(
        (arg_param: ArgumentoParametrizacion) =>
        arg_param.clave_id == this.arg_selecto
      )
    )

    if (arg_selecto) this.emitir_argumentos.emit(arg_selecto.argumentos);
    */
  }

}