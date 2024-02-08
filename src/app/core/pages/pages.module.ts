import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { PagesRoutingModule } from './pages-routing.module';

import { PageAboutComponent } from './page-about/page-about.component';
import { PageMainComponent } from './page-main/page-main.component';
import { PageMainSetUpComponent } from './page-main-set-up/page-main-set-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    PageAboutComponent,
    PageMainComponent,
    PageMainSetUpComponent,
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
    PageMainSetUpComponent,
    PageNotFoundComponent,
  ]
})
export class PagesModule { }