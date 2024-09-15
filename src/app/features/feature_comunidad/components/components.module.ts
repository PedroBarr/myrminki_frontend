import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import {
  AcademicReferecnceBoxComponent
} from './academic-referecnce-box/academic-referecnce-box.component';

import {
  TutorialBoxComponent
} from './tutorial-box/tutorial-box.component';

import {
  AcademicReferecnceEditorComponent
} from './academic-referecnce-editor/academic-referecnce-editor.component';


@NgModule({
  declarations: [
    AcademicReferecnceBoxComponent,
    TutorialBoxComponent,
    AcademicReferecnceEditorComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,

    RouterModule,
  ],
  exports: [
    AcademicReferecnceBoxComponent,
    TutorialBoxComponent,
    AcademicReferecnceEditorComponent,
  ]
})
export class ComponentsFeatureComunidadModule { }