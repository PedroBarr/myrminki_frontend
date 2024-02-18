import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  PageMainSetUpComponent
} from './page-main-set-up/page-main-set-up.component';

import {
  PageMainExplorerComponent
} from './page-main-explorer/page-main-explorer.component';


const routes: Routes = [
  {path: 'configurara', component: PageMainSetUpComponent },
  {path: 'explorar', component: PageMainExplorerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }