import {
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import {
  ComponentsFeatureComunidadModule
} from '../components/components.module';

import { PagesRoutingModule } from './pages-routing.module';

import {
  PageAcademicReferencesComponent
} from './page-academic-references/page-academic-references.component';

import {
  PageTutorialsComponent
} from './page-tutorials/page-tutorials.component';


@NgModule({
  schemas: [
  ],
  declarations: [
    PageAcademicReferencesComponent,
    PageTutorialsComponent,
  ],
  imports: [
    CommonModule,

    MatCardModule,

    ComponentsFeatureComunidadModule,

    PagesRoutingModule,
  ],
  exports: [
    PageAcademicReferencesComponent,
    PageTutorialsComponent,
  ]
})
export class PagesFeatureComunidadModule { }