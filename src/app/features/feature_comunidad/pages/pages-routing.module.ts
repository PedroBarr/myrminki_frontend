import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  PageAcademicReferencesComponent
} from './page-academic-references/page-academic-references.component';

import {
  PageTutorialsComponent
} from './page-tutorials/page-tutorials.component';


const routes: Routes = [
  {path: 'guias', component: PageTutorialsComponent },
  {path: 'academia', component: PageAcademicReferencesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }