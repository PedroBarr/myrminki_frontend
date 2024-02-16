import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { PagesRoutingModule } from './pages-routing.module';

import {
  PageAboutComponent
} from './page-about/page-about.component';

import {
  PageMainComponent
} from './page-main/page-main.component';

import {
  PageNotFoundComponent
} from './page-not-found/page-not-found.component';



@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [
    PageAboutComponent,
    PageMainComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,

    MatCardModule,

    PagesRoutingModule,
  ],
  exports: [
    PageAboutComponent,
    PageMainComponent,
    PageNotFoundComponent,
  ]
})
export class PagesModule { }