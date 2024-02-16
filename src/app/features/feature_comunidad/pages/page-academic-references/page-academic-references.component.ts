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
        apa_reference: 'APA 1',
      } as AcademicReference,
      {
        apa_reference: 'APA 2',
      } as AcademicReference,
    ];
  }
}