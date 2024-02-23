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

}