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
  PrevisualizacionInstancia
} from '../../models/optimizador.model';

import {
  InstcBoxComponent
} from '../../components/instc-box/instc-box.component';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-instc-picker-box',
  templateUrl: './instc-picker-box.component.html',
  styleUrls: ['./instc-picker-box.component.scss'],
})

export class InstcPickerBoxComponent implements OnInit {

  instancias: PrevisualizacionInstancia[] = [];

  instc_editor_apertura: boolean = false;

  @Input() instc_selecto: string | null = null;
  @Input() es_emergente: boolean = false;
  @Output() emitir_seleccion = new EventEmitter<string | null>();
  @Output() emitir_parametros = new EventEmitter<string | null>();

  constructor (
    public instc_editor_emergente: MatDialog,
  ) { }

  async ngOnInit ( ) {
    await this.loadInstcs();
  }

  /**
  * Load instancias from API
  */
  async loadInstcs ( ) {
    await axios.get(
      environment.MYRMEX_API + '/instancias/explorar'
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.instancias = response.data.map(
            (instancia: any, i_instc: number) => {
              const {
                nombre: titulo_entrada,
                clave_identificadora: id,
                problema: nombre_problema,
                parametrizacion_problema_cantidad_parametros: n_parametros_problema,
                cantidad_argumentaciones: n_argumentaciones,
                cantidad_soluciones: n_soluciones,
                lenguaje_programacion,
                parametrizacion_problema_identificador: parametros_problema_id,
              } = instancia;

              const etiquetas = instancia.etiquetas.map(
                (etiqueta: any) => etiqueta.etiqueta
              );

              return new PrevisualizacionInstancia({
                titulo_entrada,
                etiquetas,
                id,
                nombre_problema,
                n_parametros_problema,
                n_argumentaciones,
                n_soluciones,
                lenguaje_programacion,
                parametros_problema_id,
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

  set_instc_editor_apertura (variable: boolean, instancia_id: string) {
    this.instc_editor_apertura = variable;

    const instc_editor_referencia = this.instc_editor_emergente.open(
      InstcBoxComponent,
      { panelClass: 'emergente'}
    );

    const instc_editor_componente = (
      instc_editor_referencia.componentInstance
    );

    instc_editor_componente.args_editables = false;
    instc_editor_componente.secciones_colapsables = false;

    instc_editor_componente.instancia_id = instancia_id;
    instc_editor_componente.loadInstancia();

    instc_editor_referencia.afterClosed().subscribe((result: any) => {
      this.instc_editor_apertura = !variable;
    });
  }

  set_instc_selected (valor: string | null) {
    this.instc_selecto = valor;

    const instc_selecto: PrevisualizacionInstancia | undefined = (
      this.instancias.find(
        (instancia: PrevisualizacionInstancia) =>
        instancia.id == this.instc_selecto
      )
    )

    if (instc_selecto) {
      this.emitir_seleccion.emit(instc_selecto.id);
      this.emitir_parametros.emit(instc_selecto.parametros_problema_id);
    } else {
      this.instc_selecto = null;
    }
  }

}