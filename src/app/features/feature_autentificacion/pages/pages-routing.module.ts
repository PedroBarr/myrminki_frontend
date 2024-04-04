import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  restrictorNecesitaNoAutenticar,
} from 'src/app/shared/guard/auth.guard';

import {
    PageLoginComponent
} from './page-login/page-login.component';

const routes: Routes = [
  {
    path: 'iniciar_sesion',
    component: PageLoginComponent,
    canActivate: [restrictorNecesitaNoAutenticar],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }