import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ComponentsFeatureAutentificacionModule
} from '../components/components.module';

import {
  PageLoginComponent
} from './page-login/page-login.component';

import {
  PageLogupComponent
} from './page-logup/page-logup.component';

import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [
    PageLoginComponent,
    PageLogupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ComponentsFeatureAutentificacionModule,

    PagesRoutingModule,
  ],
  exports: [
    PageLoginComponent,
    PageLogupComponent,
  ]
})
export class PagesFeatureAutentificacionModule { }