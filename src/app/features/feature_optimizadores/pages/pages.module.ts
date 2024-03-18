import {
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

import { MarkdownModule } from 'ngx-markdown';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/components/prism-python.min.js';

import {
  ComponentsFeatureOptimizadoresModule
} from '../components/components.module';

import { PagesRoutingModule } from './pages-routing.module';

import {
  PageMainSetUpComponent
} from './page-main-set-up/page-main-set-up.component';

import {
  PageMainExplorerComponent
} from './page-main-explorer/page-main-explorer.component';

import {
  PageExplorerAlgorithmComponent
} from './page-explorer-algorithm/page-explorer-algorithm.component';

import {
  PageExplorerImplementationComponent
} from './page-explorer-implementation/page-explorer-implementation.component';

import {
  PageExplorerProblemComponent
} from './page-explorer-problem/page-explorer-problem.component';

import {
  PageExplorerInstanceComponent
} from './page-explorer-instance/page-explorer-instance.component';


@NgModule({
  schemas: [
  ],
  declarations: [
    PageMainSetUpComponent,
    PageMainExplorerComponent,
    PageExplorerAlgorithmComponent,
    PageExplorerImplementationComponent,
    PageExplorerProblemComponent,
    PageExplorerInstanceComponent,
  ],
  imports: [
    CommonModule,

    MatCardModule,
    MatChipsModule,
    MatExpansionModule,

    MarkdownModule.forRoot(),

    ComponentsFeatureOptimizadoresModule,

    PagesRoutingModule,
  ],
  exports: [
    PageMainSetUpComponent,
    PageMainExplorerComponent,
    PageExplorerAlgorithmComponent,
    PageExplorerImplementationComponent,
    PageExplorerProblemComponent,
    PageExplorerInstanceComponent,
  ]
})
export class PagesFeatureOptimizadoresModule { }