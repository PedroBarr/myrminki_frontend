import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  PageMainSetUpComponent
} from './page-main-set-up/page-main-set-up.component';

import {
  PageMainExplorerComponent
} from './page-main-explorer/page-main-explorer.component';

import {
  PageExplorerAlgorithmComponent
} from './page-explorer-algorithm/page-explorer-algorithm.component';


const routes: Routes = [
  {path: 'configurara', component: PageMainSetUpComponent },
  {path: 'explorar', component: PageMainExplorerComponent },
  {path: 'algoritmo/:identificador', component: PageExplorerAlgorithmComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }