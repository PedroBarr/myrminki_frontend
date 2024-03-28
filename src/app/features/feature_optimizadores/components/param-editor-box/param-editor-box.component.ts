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
  ParametroEditable,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-param-editor-box',
  templateUrl: './param-editor-box.component.html',
  styleUrls: ['./param-editor-box.component.scss'],
})

export class ParamEditorBoxComponent implements OnInit, OnChanges {

  @Input() parameter: ParametroEditable = new ParametroEditable();
  @Input() tipos: string[] = [];
  @Input() restricciones: {[clave_restrc: string]: any} = {};
  @Output() emitir_cambios = new EventEmitter<any[2]>();

  async ngOnInit ( ) {
    // await this.loadParamzProblm();
  }

  async ngOnChanges ( changes: any ) {
    /*
    if (changes.paramz_problm_id) {
      if (changes.paramz_problm_id.firstChange) await this.loadParamzProblm();
    }
    */
  }

  set_es_matricial () {
    this.emitir_cambios.emit(['es_matricial', !this.parameter.es_matricial]);
  }

  confirmar_cambios (nombre_dato: string, dato: any) {
    this.emitir_cambios.emit([nombre_dato, dato.value]);
  }

  get_restricciones_list ( ): string[] {
    return Object.keys(this.restricciones);
  }

  have_restriccion (nombre_restric: string): boolean {
    return (
      this.parameter.restricciones.find(
        (restric: any) => restric.tipo_restriccion == nombre_restric
      ) != undefined
    );
  }

  add_restriccion (nombre_restric: string) {
    this.emitir_cambios.emit([
      'restricciones',
      this.parameter.restricciones
        .filter(
          (restric: any) => restric.tipo_restriccion != nombre_restric
        )
        .concat([{
          tipo_restriccion: nombre_restric,
          valor_restriccion: '',
        }])
    ]);
  }

  remove_restriccion (nombre_restric: string) {
    this.emitir_cambios.emit([
      'restricciones',
      this.parameter.restricciones
        .filter(
          (restric: any) => restric.tipo_restriccion != nombre_restric
        )
    ]);
  }

  get_restriccion (nombre_restric: string): string {
    const restric = this.parameter.restricciones.find(
      (restric: any) => restric.tipo_restriccion == nombre_restric
    );

    return restric ? restric.valor_restriccion : '';
  }

  set_restriccion (nombre_restric: string, valor_restric: any) {
    this.emitir_cambios.emit([
      'restricciones',
      this.parameter.restricciones
        .filter(
          (restric: any) => restric.tipo_restriccion != nombre_restric
        )
        .concat([{
          tipo_restriccion: nombre_restric,
          valor_restriccion: String(valor_restric.value),
        }])
    ]);
  }

  get_restriccion_multi (
    nombre_restric: string,
    nombre_posibilidad: string
  ): boolean {
    return (
      this
        .get_restriccion(nombre_restric)
        .includes('|' + nombre_posibilidad + '|')
    );
  }

  get_restriccion_multi_list (
    nombre_restric: string
  ): string[] {
    const valor = this.get_restriccion(nombre_restric);
    const lista = valor.substring(1, valor.length - 1).split('||');
    return String(lista) == '' ? [] : lista;
  }

  set_restriccion_multi (
    nombre_restric: string,
    nombre_posibilidad: string,
  ) {
    const valor_restric = this.get_restriccion(nombre_restric);

    this.emitir_cambios.emit([
      'restricciones',
      this.parameter.restricciones
        .filter(
          (restric: any) => restric.tipo_restriccion != nombre_restric
        )
        .concat([{
          tipo_restriccion: nombre_restric,
          valor_restriccion: (
            valor_restric.includes('|' + nombre_posibilidad + '|') ?
            valor_restric.replace('|' + nombre_posibilidad + '|','') :
            valor_restric.concat('|' + nombre_posibilidad + '|')
          ),
        }])
    ]);
  }

  add_restriccion_multi_from_input (
    nombre_restric: string,
    input_posibilidad: any,
  ) {
    const valor = input_posibilidad.value;
    this.add_restriccion_multi(nombre_restric, valor);
    input_posibilidad.value = '';
  }

  add_restriccion_multi (
    nombre_restric: string,
    nombre_posibilidad: string,
  ) {
    const valor_restric = this.get_restriccion(nombre_restric);

    this.emitir_cambios.emit([
      'restricciones',
      this.parameter.restricciones
        .filter(
          (restric: any) => restric.tipo_restriccion != nombre_restric
        )
        .concat([{
          tipo_restriccion: nombre_restric,
          valor_restriccion: (
            valor_restric.concat('|' + nombre_posibilidad + '|')
          ),
        }])
    ]);
  }

  remove_restriccion_multi (
    nombre_restric: string,
    nombre_posibilidad: string,
  ) {
    const valor_restric = this.get_restriccion(nombre_restric);

    this.emitir_cambios.emit([
      'restricciones',
      this.parameter.restricciones
        .filter(
          (restric: any) => restric.tipo_restriccion != nombre_restric
        )
        .concat([{
          tipo_restriccion: nombre_restric,
          valor_restriccion: (
            valor_restric.replace('|' + nombre_posibilidad + '|','')
          ),
        }])
    ]);
  }

}