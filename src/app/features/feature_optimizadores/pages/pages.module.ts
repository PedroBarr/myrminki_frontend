import {
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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

import {
  PageExplorerSolutionComponent
} from './page-explorer-solution/page-explorer-solution.component';

import {
  PageEditorSolutionComponent
} from './page-editor-solution/page-editor-solution.component';


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
    PageExplorerSolutionComponent,
    PageEditorSolutionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,

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
    PageExplorerSolutionComponent,
    PageEditorSolutionComponent,
  ]
})
export class PagesFeatureOptimizadoresModule { }