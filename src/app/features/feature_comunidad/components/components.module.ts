import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import {
  AcademicReferecnceBoxComponent
} from './academic-referecnce-box/academic-referecnce-box.component';

import {
  TutorialBoxComponent
} from './tutorial-box/tutorial-box.component';


@NgModule({
  declarations: [
    AcademicReferecnceBoxComponent,
    TutorialBoxComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatListModule,

    RouterModule,
  ],
  exports: [
    AcademicReferecnceBoxComponent,
    TutorialBoxComponent,
  ]
})
export class ComponentsFeatureComunidadModule { }