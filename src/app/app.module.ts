import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './core/components/components.module';
import { PagesModule } from './core/pages/pages.module';

import {
  PagesFeatureOptimizadoresModule
} from './features/feature_optimizadores/pages/pages.module';

import {
  PagesFeatureComunidadModule
} from './features/feature_comunidad/pages/pages.module';

import {
  PagesFeatureAutentificacionModule
} from './features/feature_autentificacion/pages/pages.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    PagesModule,
    ComponentsModule,

    PagesFeatureOptimizadoresModule,

    PagesFeatureComunidadModule,

    PagesFeatureAutentificacionModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
