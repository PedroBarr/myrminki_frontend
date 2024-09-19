import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import {
  AcademicReference,
} from '../../models/academic-reference.model';

import {
  Acciones,
} from '../../../feature_optimizadores/models/acciones.model';

import { environment } from 'src/environments/environment';


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
  @Input() credencial_id: string | null = null;
  
  @Input() es_reportable: boolean = false;
  @Input() es_editable: boolean = false;
  @Input() es_eliminable: boolean = false;
  @Input() es_asociable: boolean = false;

  @Input() asociados: AcademicReference[] = [];
  
  @Output() emitirSeleccion: EventEmitter<AcademicReference> = 
    new EventEmitter<AcademicReference>();

  @Output() emitirEditarReferente: EventEmitter<AcademicReference> =
    new EventEmitter<AcademicReference>();

  @Output() emitirEliminarReferente: EventEmitter<AcademicReference> =
    new EventEmitter<AcademicReference>();

  @Output() emitirReAsociacion: EventEmitter<void> = new EventEmitter<void>();


  constructor (
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['academicReferences']) {
      this.references = this.academicReferences;
    }
  }

  /**
   * Do reasoc from api
   */
  async doReasoc(obj: any) {
    const axiosInstance = axios.create();
    
    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);
    
    await axiosInstance.post(
        environment.MYRMEX_API + '/referente/asociacion',
        obj,
    )
      .then(response => {
        console.log(response.data);

        if (response.data['Respuesta']) this.emitirReAsociacion.emit();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => {
        this.authIntercepService.removeAuthInterceptor(
          axiosInstance,
          intercep_auth_id
        );

        this.authIntercepService.removeAuthErrorInterceptor(
          axiosInstance,
          intercep_error_id
        );
      });
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

  asociarReferente(refrt: AcademicReference) {
    if (
      this.es_asociable &&
      this.credencial_id &&
      this.authIntercepService.getAuth() !== null &&
      !this.esAsociado(refrt)
    ) {
      this.doReasoc({
        credencial: this.credencial_id,
        refrt_id: refrt.refrt_id,
        accion: 'asociar',
      });
    }
  }

  desasociarReferente(refrt: AcademicReference) {
    if (
      this.es_asociable &&
      this.credencial_id &&
      this.authIntercepService.getAuth() !== null &&
      this.esAsociado(refrt)
    ) {
      this.doReasoc({
        credencial: this.credencial_id,
        refrt_id: refrt.refrt_id,
        accion: 'desasociar',
      });
    }
  }

  public esVacio(): boolean {
    return !this.references.length || this.references.length === 0;
  }

  public esAsociado(refrt: AcademicReference): boolean {
    if (this.asociados.length === 0) return false;

    return this.asociados.some(
      (asociado: AcademicReference) => {
        return asociado.refrt_id === refrt.refrt_id;
      }
    );
  }

  public esAsociable(): boolean {
    return this.es_asociable && this.credencial_id !== null;
  }

  //{ refrt: AcademicReference, accion: string,}
  public interpretarReasociacion(
    AcademicReference: AcademicReference,
    accion: string
  ) {
    if (accion === 'asociar') {
      this.asociarReferente(AcademicReference);
    } else if (accion === 'desasociar') {
      this.desasociarReferente(AcademicReference);
    }
  }

}
