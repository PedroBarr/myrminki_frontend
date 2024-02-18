import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import axios from 'axios';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-tag-search-box',
  templateUrl: './tag-search-box.component.html',
  styleUrls: ['./tag-search-box.component.scss'],
})

export class TagSearchBoxComponent implements OnInit {

  controlBuscadorEtiqueta = new FormControl('');
  etiquetas: string[] = [];
  etiquetasFiltradas: Observable<string[]> = new Observable<string[]>();
  etiquetasAgregadas: string[] = [];

  @Output() emitirSeleccion = new EventEmitter<string>();
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

  private _filtrar(valor_etiqueta: string): string[] {
    const etiqueta_estandar = valor_etiqueta.toLowerCase();

    return this.etiquetas.filter(etiqueta =>
      (
        etiqueta.toLowerCase().includes(etiqueta_estandar) &&
        !(this.etiquetasAgregadas.includes(etiqueta))
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
          this.etiquetas = response.data.map((tipo_algoritmo: any) =>
            tipo_algoritmo.etiqueta
          );
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  selectEtiqueta (evt: MatAutocompleteSelectedEvent) {
    const valor_etiqueta: string = evt.option.value;

    if (!(this.etiquetasAgregadas.includes(valor_etiqueta))) {
      this.etiquetasAgregadas.push(valor_etiqueta);
      this.controlBuscadorEtiqueta = new FormControl('');
      this.initEtiquetasFiltradas();
      this.emitirSeleccion.emit(valor_etiqueta);
    }
  }

  removeEtiqueta (valor_etiqueta: string) {
    if (this.etiquetasAgregadas.includes(valor_etiqueta)) {
      this.etiquetasAgregadas = this.etiquetasAgregadas.filter(etiqueta => (
        etiqueta != valor_etiqueta
      ));
      this.emitirRemocion.emit(valor_etiqueta);
    }
  }

}