import {
    Component,
    Input,
} from '@angular/core';

import { AcademicReference } from '../../models/academic-reference.model';


@Component({
  selector: 'myrmex-academic-referecnce-box',
  templateUrl: './academic-referecnce-box.component.html',
  styleUrls: ['./academic-referecnce-box.component.scss'],
})

export class AcademicReferecnceBoxComponent {

  @Input() academicReference: AcademicReference = <AcademicReference>{};
  @Input() es_reportable: boolean = false;
  @Input() es_eliminable: boolean = false;

  public esMenuVisible ( ) {
    return (
      this.es_reportable ||
      this.es_eliminable ||
      false
    );
  }

}