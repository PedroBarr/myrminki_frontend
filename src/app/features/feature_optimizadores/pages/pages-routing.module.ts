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

import {
  PageEditorProblemComponent
} from './page-editor-problem/page-editor-problem.component';

import {
  PageEditorAlgorithmComponent
} from './page-editor-algorithm/page-editor-algorithm.component';


const routes: Routes = [
  {path: 'configurara', component: PageMainSetUpComponent },
  {path: 'explorar', component: PageMainExplorerComponent },
  {
    path: 'algoritmo',
    children: [
      {
        path: 'editor',
        component: PageEditorAlgorithmComponent,
      },
      {
        path: 'editor/:identificador',
        component: PageEditorAlgorithmComponent,
      },
      {
        path: 'visor/:identificador',
        component: PageExplorerAlgorithmComponent,
      },
    ],
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
        path: 'editor',
        component: PageEditorProblemComponent,
      },
      {
        path: 'editor/:identificador',
        component: PageEditorProblemComponent,
      },
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