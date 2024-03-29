import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import axios from 'axios';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Etiqueta } from '../../models/etiqueta.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-tag-search-box',
  templateUrl: './tag-search-box.component.html',
  styleUrls: ['./tag-search-box.component.scss'],
})

export class TagSearchBoxComponent implements OnInit {

  etiquetas: Etiqueta[] = [];

  controlBuscadorEtiqueta = new FormControl('');
  editor_mode: 'E' | 'B' = 'B';

  etiquetasFiltradas: Observable<Etiqueta[]> = new Observable<Etiqueta[]>();
  etiquetasAgregadas: Etiqueta[] = [];

  @Input() es_editor: boolean = false;

  @Output() emitirSeleccion = new EventEmitter<Etiqueta>();
  @Output() emitirRemocion = new EventEmitter<string>();

  async ngOnInit ( ) {
    await this.loadTags();
    this.initEtiquetasFiltradas();
  }

  initEtiquetasFiltradas ( ) {
    this.etiquetasFiltradas = this.controlBuscadorEtiqueta.valueChanges.pipe(
      startWith(''),
      map(valor_etiqueta => this._filtrar(valor_etiqueta || '')),
    );
  }

  private _filtrar(valor_etiqueta: string): Etiqueta[] {
    const etiqueta_estandar = valor_etiqueta.toLowerCase();

    return this.etiquetas.filter(etiqueta =>
      (
        etiqueta.etiqueta.toLowerCase().includes(etiqueta_estandar) &&
        !(this.etiquetasAgregadas.find(etiquetaAgregada => etiquetaAgregada.id == etiqueta.id))
      )
    );
  }

  /**
  * Load tags from API
  */
  async loadTags ( ) {
    await axios.get(
      environment.MYRMEX_API + '/tipos_algoritmo'
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.length) {
          this.etiquetas = response.data.map((tipo_algoritmo: any) => ({
            id: tipo_algoritmo.id,
            etiqueta: tipo_algoritmo.etiqueta,
            descripcion: tipo_algoritmo.descripcion,
          } as Etiqueta));
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  selectEtiqueta (evt: MatAutocompleteSelectedEvent) {
    const valor_etiqueta: any = evt.option.value;
    const etiqueta: Etiqueta | undefined =
        this.etiquetas.find(etiqueta => etiqueta.etiqueta == valor_etiqueta);

    if (
      etiqueta &&
      !(this.etiquetasAgregadas.find(
        etiqueta => etiqueta.etiqueta == valor_etiqueta
      ))
    ) {
      this.etiquetasAgregadas.push(etiqueta);
      this.controlBuscadorEtiqueta.setValue('');
      this.emitirSeleccion.emit(etiqueta);
    }
  }

  removeEtiqueta (id_etiqueta: string) {
    if (this.etiquetasAgregadas.find(etiqueta => etiqueta.id == id_etiqueta)) {
      this.etiquetasAgregadas = this.etiquetasAgregadas.filter(etiqueta => (
        etiqueta.id != id_etiqueta
      ));
      this.controlBuscadorEtiqueta.setValue('');
      this.emitirRemocion.emit(id_etiqueta);
    }
  }

  setUpEditor (buscador: any) {
    console.log(buscador);
  }

}