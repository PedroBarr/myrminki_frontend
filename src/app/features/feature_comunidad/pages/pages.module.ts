import {
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

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

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,

    ComponentsFeatureComunidadModule,

    PagesRoutingModule,
  ],
  exports: [
    PageAcademicReferencesComponent,
    PageTutorialsComponent,
  ]
})
export class PagesFeatureComunidadModule { }