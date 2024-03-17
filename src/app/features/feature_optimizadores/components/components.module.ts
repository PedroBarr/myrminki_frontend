import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MarkdownModule } from 'ngx-markdown';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

import {
  TagSearchBoxComponent
} from './tag-search-box/tag-search-box.component';

import {
  ParamzAlgorithmBoxComponent
} from './paramz-algorithm-box/paramz-algorithm-box.component';

import {
  ArgsAlgorithmBoxComponent
} from './args-algorithm-box/args-algorithm-box.component';

import {
  ImplmntEvalBoxComponent
} from './implmnt-eval-box/implmnt-eval-box.component';


@NgModule({
  declarations: [
    TagSearchBoxComponent,
    ParamzAlgorithmBoxComponent,
    ArgsAlgorithmBoxComponent,
    ImplmntEvalBoxComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,

    MarkdownModule.forRoot(),

    RouterModule,
  ],
  exports: [
    TagSearchBoxComponent,
    ParamzAlgorithmBoxComponent,
    ArgsAlgorithmBoxComponent,
    ImplmntEvalBoxComponent,
  ]
})
export class ComponentsFeatureOptimizadoresModule { }