import {
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import {
  ComponentsFeatureOptimizadoresModule
} from '../components/components.module';

import { PagesRoutingModule } from './pages-routing.module';

import {
  PageMainSetUpComponent
} from './page-main-set-up/page-main-set-up.component';

import {
  PageMainExplorerComponent
} from './page-main-explorer/page-main-explorer.component';


@NgModule({
  schemas: [
  ],
  declarations: [
    PageMainSetUpComponent,
    PageMainExplorerComponent,
  ],
  imports: [
    CommonModule,

    MatCardModule,

    ComponentsFeatureOptimizadoresModule,

    PagesRoutingModule,
  ],
  exports: [
    PageMainSetUpComponent,
    PageMainExplorerComponent,
  ]
})
export class PagesFeatureOptimizadoresModule { }