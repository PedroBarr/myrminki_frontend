import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  restrictorNecesitaNoAutenticar,
  restrictorNecesitaAutenticar,
} from 'src/app/shared/guards/auth.guard';

import {
    PageLoginComponent
} from './page-login/page-login.component';

import {
  PageLogupComponent
} from './page-logup/page-logup.component';

import {
  PageProfileComponent
} from './page-profile/page-profile.component';

import {
  PageReplevinComponent
} from './page-replevin/page-replevin.component';

import {
  PageSwapupComponent
} from './page-swapup/page-swapup.component';

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
  {
    path: 'perfil',
    component: PageProfileComponent,
    canActivate: [restrictorNecesitaAutenticar],
  },
  {
    path: 'perfil/:id',
    component: PageProfileComponent,
    canActivate: [],
  },
  {
    path: 'recuperar_clave',
    component: PageReplevinComponent,
    canActivate: [restrictorNecesitaNoAutenticar],
  },
  {
    path: 'recuperar_clave/:simbolismo',
    component: PageSwapupComponent,
    canActivate: [],
  },
  {
    path: 'cambiar_clave',
    component: PageSwapupComponent,
    canActivate: [restrictorNecesitaAutenticar],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }