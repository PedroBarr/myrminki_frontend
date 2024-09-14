import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  AcademicReference
} from '../../models/academic-reference.model';

@Component({
  selector: 'app-academic-referecnce-editor',
  templateUrl: './academic-referecnce-editor.component.html',
  styleUrls: ['./academic-referecnce-editor.component.scss']
})
export class AcademicReferecnceEditorComponent {

  @Input() refrt_selecto: AcademicReference = <AcademicReference>{};
  @Input() es_emergente: boolean = false;

  @Output() emitirClausura: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
  ) { }

}
