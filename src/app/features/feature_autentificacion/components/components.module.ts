import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { PanelInicioSesionComponent } from './panel-inicio-sesion/panel-inicio-sesion.component';


@NgModule({
  declarations: [
    PanelInicioSesionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,

    RouterModule,
  ],
  exports: [
    PanelInicioSesionComponent,
  ]
})
export class ComponentsFeatureAutentificacionModule { }