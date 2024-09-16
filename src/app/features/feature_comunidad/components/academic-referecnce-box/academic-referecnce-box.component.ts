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

  @Input() academicReference: AcademicReference = <AcademicReference>{};
  @Input() es_editable: boolean = false;
  @Input() es_eliminable: boolean = false;
  @Input() es_reportable: boolean = false;

  @Output() emitirEdicion: EventEmitter<AcademicReference> =
    new EventEmitter<AcademicReference>();

  public esMenuVisible ( ) {
    return (
      this.es_reportable ||
      this.es_eliminable ||
      false
    );
  }

  public editarReferente ( ) {
    if (this.es_editable && this.academicReference.refrt_id) {
      this.emitirEdicion.emit(this.academicReference);
    }
  }

}