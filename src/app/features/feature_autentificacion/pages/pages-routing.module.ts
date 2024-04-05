import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  restrictorNecesitaNoAutenticar,
} from 'src/app/shared/guards/auth.guard';

import {
    PageLoginComponent
} from './page-login/page-login.component';

import {
  PageLogupComponent
} from './page-logup/page-logup.component';

const routes: Routes = [
  {
    path: 'iniciar_sesion',
    component: PageLoginComponent,
    canActivate: [restrictorNecesitaNoAutenticar],
  },
  {
    path: 'registrar_usuario',
    component: PageLogupComponent,
    canActivate: [restrictorNecesitaNoAutenticar],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }