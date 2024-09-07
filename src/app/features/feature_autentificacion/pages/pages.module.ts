import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import {
  ComponentsFeatureOptimizadoresModule
} from '../../feature_optimizadores/components/components.module';

import {
  ComponentsFeatureAutentificacionModule
} from '../components/components.module';

import {
  PageLoginComponent
} from './page-login/page-login.component';

import {
  PageLogupComponent
} from './page-logup/page-logup.component';

import {
  PageProfileComponent
} from './page-profile/page-profile.component';

import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [
    PageLoginComponent,
    PageLogupComponent,
    PageProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,

    ComponentsFeatureOptimizadoresModule,
    ComponentsFeatureAutentificacionModule,

    PagesRoutingModule,
  ],
  exports: [
    PageLoginComponent,
    PageLogupComponent,
    PageProfileComponent,
  ]
})
export class PagesFeatureAutentificacionModule { }