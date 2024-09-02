import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {
  PanelInicioSesionComponent
} from './panel-inicio-sesion/panel-inicio-sesion.component';

import {
  PanelRegistroUsuarioComponent
} from './panel-registro-usuario/panel-registro-usuario.component';

import {
  PerfilBoxComponent
} from './perfil-box/perfil-box.component';


@NgModule({
  declarations: [
    PanelInicioSesionComponent,
    PanelRegistroUsuarioComponent,
    PerfilBoxComponent,
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

    RouterModule,
  ],
  exports: [
    PanelInicioSesionComponent,
    PanelRegistroUsuarioComponent,
    PerfilBoxComponent,
  ]
})
export class ComponentsFeatureAutentificacionModule { }