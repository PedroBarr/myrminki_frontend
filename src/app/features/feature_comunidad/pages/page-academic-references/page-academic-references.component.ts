import {
    Component,
    OnInit,
} from '@angular/core';

import axios from 'axios';

import { pageDescriptores } from '../../constants/descriptor.constant';

import { AcademicReference } from '../../models/academic-reference.model'

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
        enlace_web: 'http://…',
        tipo_contenido_secundario: 'Entrada',
        titulo_secundario: 'Página de difusión - entrada',
      } as AcademicReference,
      {
        apa_reference: 'Titulo de contenido desconocido. Publisher.',
        titulo_principal: 'Titulo de contenido desconocido',
        editorial: 'Publisher',
      } as AcademicReference,
    ];
  }
}