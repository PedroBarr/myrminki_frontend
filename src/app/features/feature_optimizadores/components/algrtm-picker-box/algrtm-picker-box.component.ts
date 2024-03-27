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
  PrevisualizacionAlgoritmo
} from '../../models/optimizador.model';

import {
  AlgrtmBoxComponent
} from '../../components/algrtm-box/algrtm-box.component';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-algrtm-picker-box',
  templateUrl: './algrtm-picker-box.component.html',
  styleUrls: ['./algrtm-picker-box.component.scss'],
})

export class AlgrtmPickerBoxComponent implements OnInit {

  algoritmos: PrevisualizacionAlgoritmo[] = [];

  algrtm_editor_apertura: boolean = false;

  @Input() algrtm_selecto: string | null = null;
  @Input() es_emergente: boolean = false;
  @Output() emitir_seleccion = new EventEmitter<string | null>();
  @Output() emitir_parametros = new EventEmitter<string | null>();

  constructor (
    public algrtm_editor_emergente: MatDialog,
  ) { }

  async ngOnInit ( ) {
    await this.loadAlgrtms();
  }

  /**
  * Load algoritmos from API
  */
  async loadAlgrtms ( ) {
    await axios.get(
      environment.MYRMEX_API + '/algoritmos/explorar'
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.algoritmos = response.data.map(
            (algoritmo: any, i_algrtm: number) => {
              const {
                nombre: titulo_entrada,
                clave_identificadora: id,
                parametrizacion_algoritmo_cantidad_parametros: n_parametros,
                cantidad_implementaciones: n_implementaciones,
                parametrizacion_algoritmo_diminutivo: parametros_algoritmo_id,
              } = algoritmo;

              const etiquetas = algoritmo.etiquetas.map(
                (etiqueta: any) => etiqueta.etiqueta
              );

              return new PrevisualizacionAlgoritmo({
                titulo_entrada,
                etiquetas,
                id,
                n_parametros,
                n_implementaciones,
                parametros_algoritmo_id,
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

  set_algrtm_editor_apertura (variable: boolean, algoritmo_id: string) {
    this.algrtm_editor_apertura = variable;

    const algrtm_editor_referencia = this.algrtm_editor_emergente.open(
      AlgrtmBoxComponent,
      { panelClass: 'emergente'}
    );

    const algrtm_editor_componente = (
      algrtm_editor_referencia.componentInstance
    );

    algrtm_editor_componente.secciones_colapsables = false;
    algrtm_editor_componente.algoritmo_id = algoritmo_id;
    algrtm_editor_componente.loadAlgorithm();

    algrtm_editor_referencia.afterClosed().subscribe((result: any) => {
      this.algrtm_editor_apertura = !variable;
    });
  }

  set_algrtm_selected (valor: string | null) {
    this.algrtm_selecto = valor;

    const algrtm_selecto: PrevisualizacionAlgoritmo | undefined = (
      this.algoritmos.find(
        (algoritmo: PrevisualizacionAlgoritmo) =>
        algoritmo.id == this.algrtm_selecto
      )
    )

    if (algrtm_selecto) {
      this.emitir_seleccion.emit(algrtm_selecto.id);
      this.emitir_parametros.emit(algrtm_selecto.parametros_algoritmo_id);
    } else {
      this.algrtm_selecto = null;
    }
  }

}