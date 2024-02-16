import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageAboutComponent } from './page-about/page-about.component';
import { PageMainComponent } from './page-main/page-main.component';


const routes: Routes = [
  {path: 'acerca_de', component: PageAboutComponent },
  {path: 'inicio', component: PageMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }