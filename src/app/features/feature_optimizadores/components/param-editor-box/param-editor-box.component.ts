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
  @Output() emitir_cambios = new EventEmitter<ParametroEditable>();

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

}