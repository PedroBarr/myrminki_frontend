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
  etiquetas: any[] = [];
  etiquetasFiltradas: Observable<any[]> = new Observable<any[]>();
  etiquetasAgregadas: any[] = [];

  @Output() emitirSeleccion = new EventEmitter<any>();
  @Output() emitirRemocion = new EventEmitter<any>();

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

  private _filtrar(valor_etiqueta: any): any[] {
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
          this.etiquetas = response.data.map((tipo_algoritmo: any) =>
            tipo_algoritmo
          );
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

  selectEtiqueta (evt: MatAutocompleteSelectedEvent) {
    const valor_etiqueta: any = evt.option.value;
    const etiqueta: any = this.etiquetas.find(etiqueta => etiqueta.etiqueta == valor_etiqueta);

    if (!(this.etiquetasAgregadas.find(etiqueta => etiqueta.etiqueta == valor_etiqueta))) {
      this.etiquetasAgregadas.push(etiqueta);
      this.controlBuscadorEtiqueta = new FormControl('');
      this.initEtiquetasFiltradas();
      this.emitirSeleccion.emit(etiqueta);
    }
  }

  removeEtiqueta (id_etiqueta: string) {
    if (this.etiquetasAgregadas.find(etiqueta => etiqueta.id == id_etiqueta)) {
      this.etiquetasAgregadas = this.etiquetasAgregadas.filter(etiqueta => (
        etiqueta.id != id_etiqueta
      ));
      this.emitirRemocion.emit(id_etiqueta);
    }
  }

}