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

import {
  PageEditorInstanceComponent
} from './page-editor-instance/page-editor-instance.component';

import {
  PageEditorImplementationComponent
} from './page-editor-implementation/page-editor-implementation.component';


const routes: Routes = [
  {path: 'configurara', component: PageMainSetUpComponent },
  {path: 'explorar', component: PageMainExplorerComponent },
  {
    path: 'algoritmo/:identificador',
    component: PageExplorerAlgorithmComponent,
  },
  {
    path: 'implementacion',
    children: [
      {
        path: 'editor',
        component: PageEditorImplementationComponent,
      },
      {
        path: 'editor/:identificador',
        component: PageEditorImplementationComponent,
      },
      {
        path: 'visor/:identificador',
        component: PageExplorerImplementationComponent,
      },
    ],
  },
  {
    path: 'problema',
    children: [
      {
        path: 'visor/:identificador',
        component: PageExplorerProblemComponent,
      },
    ],
  },
  {
    path: 'instancia',
    children: [
      {
        path: 'editor',
        component: PageEditorInstanceComponent,
      },
      {
        path: 'editor/:identificador',
        component: PageEditorInstanceComponent,
      },
      {
        path: 'visor/:identificador',
        component: PageExplorerInstanceComponent,
      },
    ],
  },
  {
    path: 'solucion',
    children: [
      {
        path: 'editor',
        component: PageEditorSolutionComponent,
      },
      {
        path: 'editor/:identificador',
        component: PageEditorSolutionComponent,
      },
      {
        path: 'visor/:identificador',
        component: PageExplorerSolutionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }