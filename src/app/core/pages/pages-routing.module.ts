import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageAboutComponent } from './page-about/page-about.component';
import { PageMainComponent } from './page-main/page-main.component';
import { PageMainSetUpComponent } from './page-main-set-up/page-main-set-up.component';


const routes: Routes = [
  {path: 'acerca_de', component: PageAboutComponent },
  {path: 'configurara', component: PageMainSetUpComponent },
  {path: 'inicio', component: PageMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }