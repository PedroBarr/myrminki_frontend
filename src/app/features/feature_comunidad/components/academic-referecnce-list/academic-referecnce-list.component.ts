import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
export class AcademicReferecnceListComponent implements OnChanges, OnInit {

  private refertente_seleccionado: AcademicReference | null = null;
  references: AcademicReference[] = [];
  
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['academicReferences']) {
      this.references = this.academicReferences;
    }
  }

  editarReferente (refrt: AcademicReference | null) {
    let refrt_selecto = refrt ? refrt : new AcademicReference();
    this.emitirEditarReferente.emit(refrt_selecto);
  }

  eliminarReferente (refrt: AcademicReference) {
    this.emitirEliminarReferente.emit(refrt);
  }

  filtrarReferentes(termino_input: any = '') {
    const termino: string = termino_input.target.value;
    
    if (termino === '') {
      this.references = this.academicReferences;
    }
    
    this.references = this.academicReferences.filter(
      (refrt: AcademicReference) => {
        return AcademicReference.replaceSpecialCharacters(
          refrt.toCrudo().toLowerCase()
        )
          .includes(AcademicReference.replaceSpecialCharacters(
            termino.toLowerCase()
          ));
      }
    );
  }

  public esVacio(): boolean {
    return !this.references.length || this.references.length === 0;
  }

}
