import {
    Component,
    OnInit,
} from '@angular/core';

import axios from 'axios';

import { pageDescriptores } from '../../constants/descriptor.constant';

import { AcademicReference } from '../../models/academic-reference.model'

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-academic-references',
  templateUrl: './page-academic-references.component.html',
  styleUrls: ['./page-academic-references.component.scss'],
})
export class PageAcademicReferencesComponent implements OnInit {

  pageDescriptor: string = pageDescriptores['referentes_academicos'];

  academicReferences: AcademicReference[] = [];

  ngOnInit ( ) {
    this.loadSlides();
  }

  /**
  * Load slides from API
  */
  async loadSlides() {
    const referentes: AcademicReference[] = [];

    axios.get(
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
                  nuevoReferente['anho'] = principal.titulo;

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
      });

/*
    this.academicReferences = [
      {
        apa_reference: 'Author, A., & Author, B. (2001). Chapter title. In A. Editor, B. Editor, & C. Editor (Eds.), Titulo de Libro (2da ed.). Publisher. https://doi.org/xx-xxxxxxx',
        tipo_contenido: 'Libro',
        titulo_principal: 'Titulo de Libro',
        anho: 2001,
        edicion: '2da',
        autores: [
          'Author, A.',
          'Author, B.',
        ],
        editorial: 'Publisher',
        enlace_doi: 'https://doi.org/xx-xxxxxxx',
        isbn: '978-3-16-148410-0',
        tipo_contenido_secundario: 'Capítulo',
        titulo_secundario: 'Chapter title',
        editores: [
          'A. Editor',
          'B. Editor',
          'C. Editor',
        ],
      } as AcademicReference,
      {
        apa_reference: 'Author, A., & Author, B. Article title. Titulo de Revista con entregas periódicas, 22(02), 2, 3-4.',
        tipo_contenido: 'Revista',
        titulo_principal: 'Titulo de Revista con entregas periódicas',
        volumen_periodico: '22',
        numero_periodico: '02',
        autores: [
          'Author, A.',
          'Author, B.',
        ],
        isbn: '978-3-16-148410-0',
        tipo_contenido_secundario: 'Artículo',
        titulo_secundario: 'Article title',
        paginas: '2, 3-4'
      } as AcademicReference,
      {
        apa_reference: 'Author, A., & Author, B. (2024). Titulo de Sitio web. Página de difusión - entrada. http://…',
        tipo_contenido: 'Sitio web',
        titulo_principal: 'Titulo ded Sitio web',
        anho: 2024,
        autores: [
          'Author, A.',
          'Author, B.',
        ],
        enlace_red: 'http://…',
        tipo_contenido_secundario: 'Entrada',
        titulo_secundario: 'Página de difusión - entrada',
      } as AcademicReference,
      {
        apa_reference: 'Titulo de contenido desconocido. Publisher.',
        titulo_principal: 'Titulo de contenido desconocido',
        editorial: 'Publisher',
      } as AcademicReference,
    ];
*/
  }
}