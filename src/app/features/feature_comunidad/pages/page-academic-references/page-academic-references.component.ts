import {
  Component,
  OnInit,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  AutentificacionInterceptorService,
} from 'src/app/shared/guards/auth.guard';

import {
  Acciones,
} from '../../../feature_optimizadores/models/acciones.model';

import { pageDescriptores } from '../../constants/descriptor.constant';

import { AcademicReference } from '../../models/academic-reference.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-academic-references',
  templateUrl: './page-academic-references.component.html',
  styleUrls: ['./page-academic-references.component.scss'],
})
export class PageAcademicReferencesComponent implements OnInit {

  pageDescriptor: string = pageDescriptores['referentes_academicos'];

  academicReferences: AcademicReference[] = [];
  acciones: Acciones = new Acciones();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authIntercepService: AutentificacionInterceptorService,
  ) { }

  async ngOnInit ( ) {
    await this.loadActions();
    
    if (this.esRevisable())
      await this.loadReferences();
    else
      this.router.navigateByUrl('/');
  }

  /**
  * Load references from API
  */
  async loadReferences() {
    const referentes: AcademicReference[] = [];
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/referentes'
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.length) {
          response.data.forEach((referente: any) => {
            if (referente.cita_apa) {
              const nuevoReferente: AcademicReference = <AcademicReference>{
                apa_reference: referente.cita_apa,
              };

              const principal: any = referente.principal_cita;
              const secundario: any = referente.secundario_cita;
              const complemento: any = referente.complemento_cita;

              if (typeof principal === 'object') {
                if (principal.tipo)
                  nuevoReferente['tipo_contenido'] = principal.tipo;

                if (principal.titulo)
                  nuevoReferente['titulo_principal'] = principal.titulo;

                if (principal.anho)
                  nuevoReferente['anho'] = principal.anho;

                if (principal.isbn)
                  nuevoReferente['isbn'] = principal.titulo;

                if (principal.autores && principal.autores.length)
                  nuevoReferente['autores'] = principal.autores;

              }

              if (typeof secundario === 'object') {
                if (secundario.editorial)
                  nuevoReferente['editorial'] = secundario.editorial;

                if (secundario.edicion)
                  nuevoReferente['edicion'] = secundario.edicion;

                if (secundario.volumen)
                  nuevoReferente['volumen_periodico'] = secundario.volumen;

                if (secundario.numero)
                  nuevoReferente['numero_periodico'] = secundario.numero;

                if (secundario.tipo)
                  nuevoReferente['tipo_contenido_secundario'] = secundario.tipo;

                if (secundario.titulo)
                  nuevoReferente['titulo_secundario'] = secundario.titulo;

              }

              if (typeof complemento === 'object') {
                if (complemento.doi)
                  nuevoReferente['enlace_doi'] = complemento.doi;

                if (complemento.enlace_red)
                  nuevoReferente['enlace_red'] = complemento.enlace_red;

                if (complemento.paginas)
                  nuevoReferente['paginas'] = complemento.paginas;

                if (complemento.editores && complemento.editores.length)
                  nuevoReferente['editores'] = complemento.editores;

              }

              referentes.push(nuevoReferente);
            }
          });

        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.academicReferences = referentes;

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

  /**
   * Load actions from API
   */
  async loadActions ( ) {
    const axiosInstance = axios.create();

    const intercep_auth_id = this.authIntercepService.addAuthInterceptor(axiosInstance);
    const intercep_error_id = this.authIntercepService.addAuthErrorInterceptor(axiosInstance);

    await axiosInstance.get(
      environment.MYRMEX_API + '/referentes/acciones',
    )
      .then(response => {
        console.log(response.data);

        if (response.data) {
          this.acciones.fill_obj(response.data);
        }

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

  public esRevisable ( ) {
    return this.acciones.revisar_referentes;
  }

  public esReportable ( ) {
    return this.acciones.reportar_referentes;
  }

  public esEliminable ( ) {
    return this.acciones.eliminar_referentes;
  }

}