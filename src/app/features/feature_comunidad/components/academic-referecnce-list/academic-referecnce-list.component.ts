import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import {
  AcademicReference,
} from '../../models/academic-reference.model';

import {
  Acciones,
} from '../../../feature_optimizadores/models/acciones.model';

@Component({
  selector: 'myrmex-academic-referecnce-list',
  templateUrl: './academic-referecnce-list.component.html',
  styleUrls: ['./academic-referecnce-list.component.scss']
})
export class AcademicReferecnceListComponent implements OnInit {

  private refertente_seleccionado: AcademicReference | null = null;
  
  @Input() academicReferences: AcademicReference[] = [];

  @Input() es_padre_advertencia: boolean = false;

  @Input() es_reportable: boolean = false;
  @Input() es_editable: boolean = false;
  @Input() es_eliminable: boolean = false;

  @Output() emitirSeleccion: EventEmitter<AcademicReference> = 
    new EventEmitter<AcademicReference>();

  @Output() emitirEditarReferente: EventEmitter<AcademicReference> =
    new EventEmitter<AcademicReference>();

  @Output() emitirEliminarReferente: EventEmitter<AcademicReference> =
    new EventEmitter<AcademicReference>();


  constructor() { }

  ngOnInit(): void {
  }

  editarReferente (refrt: AcademicReference | null) {
    let refrt_selecto = refrt ? refrt : new AcademicReference();
    this.emitirEditarReferente.emit(refrt_selecto);
  }

  eliminarReferente (refrt: AcademicReference) {
    this.emitirEliminarReferente.emit(refrt);
  }

}
