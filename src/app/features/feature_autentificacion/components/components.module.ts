import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  ActionsWarningBoxComponent,
} from './actions-warning-box/actions-warning-box.component';

import {
  PanelInicioSesionComponent
} from './panel-inicio-sesion/panel-inicio-sesion.component';

import {
  PanelRegistroUsuarioComponent
} from './panel-registro-usuario/panel-registro-usuario.component';

import {
  PerfilBoxComponent
} from './perfil-box/perfil-box.component';

import {
  RolesBoxComponent
} from './roles-box/roles-box.component';

import {
  PanelRecuperarClaveComponent
} from './panel-recuperar-clave/panel-recuperar-clave.component';

import {
  PanelCambioClaveComponent
} from './panel-cambio-clave/panel-cambio-clave.component';


@NgModule({
  declarations: [
    ActionsWarningBoxComponent,
    PanelInicioSesionComponent,
    PanelRegistroUsuarioComponent,
    PerfilBoxComponent,
    RolesBoxComponent,
    PanelRecuperarClaveComponent,
    PanelCambioClaveComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,

    RouterModule,
  ],
  exports: [
    ActionsWarningBoxComponent,
    PanelInicioSesionComponent,
    PanelRegistroUsuarioComponent,
    PerfilBoxComponent,
    RolesBoxComponent,
    PanelRecuperarClaveComponent,
    PanelCambioClaveComponent,
  ]
})
export class ComponentsFeatureAutentificacionModule { }