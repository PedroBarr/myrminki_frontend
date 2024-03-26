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
  PrevisualizacionProblema
} from '../../models/optimizador.model';

import {
  ProblmBoxComponent
} from '../../components/problm-box/problm-box.component';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-problm-picker-box',
  templateUrl: './problm-picker-box.component.html',
  styleUrls: ['./problm-picker-box.component.scss'],
})

export class ProblmPickerBoxComponent implements OnInit {

  problemas: PrevisualizacionProblema[] = [];

  problm_editor_apertura: boolean = false;

  @Input() problm_selecto: string | null = null;
  @Input() es_emergente: boolean = false;
  @Output() emitir_seleccion = new EventEmitter<string | null>();
  @Output() emitir_parametros = new EventEmitter<string | null>();

  constructor (
    public problm_editor_emergente: MatDialog,
  ) { }

  async ngOnInit ( ) {
    await this.loadProblms();
  }

  /**
  * Load problemas from API
  */
  async loadProblms ( ) {
    await axios.get(
      environment.MYRMEX_API + '/problemas/explorar'
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.problemas = response.data.map(
            (problema: any, i_problm: number) => {
              const {
                nombre: titulo_entrada,
                clave_identificadora: id,
                parametrizacion_problema_cantidad_parametros: n_parametros_problema,
                cantidad_instancias: n_instancias,
                parametrizacion_problema_diminutivo: parametros_problema_id,
              } = problema;

              const etiquetas = problema.etiquetas.map(
                (etiqueta: any) => etiqueta.etiqueta
              );

              return new PrevisualizacionProblema({
                titulo_entrada,
                etiquetas,
                id,
                n_parametros_problema,
                n_instancias,
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

  set_problm_editor_apertura (variable: boolean, instancia_id: string) {
    this.problm_editor_apertura = variable;

    const problm_editor_referencia = this.problm_editor_emergente.open(
      ProblmBoxComponent,
      { panelClass: 'emergente'}
    );

    const problm_editor_componente = (
      problm_editor_referencia.componentInstance
    );

    problm_editor_componente.secciones_colapsables = false;
    problm_editor_componente.problema_id = problema_id;
    problm_editor_componente.loadProblema();

    problm_editor_referencia.afterClosed().subscribe((result: any) => {
      this.problm_editor_apertura = !variable;
    });
  }

  set_problm_selected (valor: string | null) {
    this.problm_selecto = valor;

    const problm_selecto: PrevisualizacionProblema | undefined = (
      this.problemas.find(
        (problema: PrevisualizacionProblema) =>
        problema.id == this.problm_selecto
      )
    )

    if (problm_selecto) {
      this.emitir_seleccion.emit(problm_selecto.id);
      this.emitir_parametros.emit(problm_selecto.parametros_problema_id);
    } else {
      this.problm_selecto = null;
    }
  }

}