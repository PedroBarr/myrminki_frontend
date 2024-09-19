import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { AcademicReference } from '../../models/academic-reference.model';


@Component({
  selector: 'myrmex-academic-referecnce-box',
  templateUrl: './academic-referecnce-box.component.html',
  styleUrls: ['./academic-referecnce-box.component.scss'],
})

export class AcademicReferecnceBoxComponent {

  @Input() academicReference: AcademicReference = new AcademicReference();

  @Input() es_editable: boolean = false;
  @Input() es_eliminable: boolean = false;
  @Input() es_reportable: boolean = false;
  @Input() es_reasociable: boolean = false;
  @Input() es_asociado: boolean = false;

  @Output() emitirEdicion: EventEmitter<AcademicReference> =
    new EventEmitter<AcademicReference>();

  @Output() emitirEliminacion: EventEmitter<AcademicReference> =
    new EventEmitter<AcademicReference>();

  @Output() emitirReasociacion:
    EventEmitter<{
      refrt: AcademicReference,
      accion: string,
    }> = new EventEmitter<{
      refrt: AcademicReference,
      accion: string,
    }>();

  public esMenuVisible ( ) {
    return (
      this.es_reportable ||
      this.es_eliminable ||
      this.es_editable ||
      this.es_reasociable ||
      false
    );
  }

  public editarReferente ( ) {
    if (this.es_editable && this.academicReference.refrt_id) {
      this.emitirEdicion.emit(this.academicReference);
    }
  }

  public eliminarReferente ( ) {
    if (this.es_eliminable && this.academicReference.refrt_id) {
      this.emitirEliminacion.emit(this.academicReference);
    }
  }

  public asociarReferente ( ) {
    if (this.es_reasociable && this.academicReference.refrt_id) {
      this.emitirReasociacion.emit({
        refrt: this.academicReference,
        accion: 'asociar',
      });
    }
  }

  public desasociarReferente ( ) {
    if (this.es_reasociable && this.academicReference.refrt_id) {
      this.emitirReasociacion.emit({
        refrt: this.academicReference,
        accion: 'desasociar',
      });
    }
  }
    

}