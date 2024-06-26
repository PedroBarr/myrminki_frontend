import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MarkdownModule } from 'ngx-markdown';

import 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-python.min.js';

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

import {
  ArgsImplmntPickerBoxComponent
} from './args-implmnt-picker-box/args-implmnt-picker-box.component';

import {
  ParamzProblemBoxComponent
} from './paramz-problem-box/paramz-problem-box.component';

import {
  InstcEvalBoxComponent
} from './instc-eval-box/instc-eval-box.component';

import {
  ArgsProblemBoxComponent
} from './args-problem-box/args-problem-box.component';

import {
  ArgsInstcPickerBoxComponent
} from './args-instc-picker-box/args-instc-picker-box.component';

import {
  SolcnEvalBoxComponent
} from './solcn-eval-box/solcn-eval-box.component';

import {
  ImplmntBoxComponent
} from './implmnt-box/implmnt-box.component';

import {
  InstcBoxComponent
} from './instc-box/instc-box.component';

import {
  ArgsBoxComponent
} from './args-box/args-box.component';

import {
  ArgsImplmntEditorBoxComponent
} from './args-implmnt-editor-box/args-implmnt-editor-box.component';

import {
  OptmzdBoxComponent
} from './optmzd-box/optmzd-box.component';

import {
  ImplmntPickerBoxComponent
} from './implmnt-picker-box/implmnt-picker-box.component';

import {
  InstcPickerBoxComponent
} from './instc-picker-box/instc-picker-box.component';

import {
  ProblmBoxComponent
} from './problm-box/problm-box.component';

import {
  ProblmPickerBoxComponent
} from './problm-picker-box/problm-picker-box.component';

import {
  AlgrtmBoxComponent
} from './algrtm-box/algrtm-box.component';

import {
  AlgrtmPickerBoxComponent
} from './algrtm-picker-box/algrtm-picker-box.component';

import {
  ParamzProblemEditorBoxComponent
} from './paramz-problem-editor-box/paramz-problem-editor-box.component';

import {
  ParamEditorBoxComponent
} from './param-editor-box/param-editor-box.component';

import {
  ParamzAlgrtmEditorBoxComponent
} from './paramz-algrtm-editor-box/paramz-algrtm-editor-box.component';


@NgModule({
  declarations: [
    TagSearchBoxComponent,
    ParamzAlgorithmBoxComponent,
    ArgsAlgorithmBoxComponent,
    ImplmntEvalBoxComponent,
    ArgsImplmntPickerBoxComponent,
    ParamzProblemBoxComponent,
    InstcEvalBoxComponent,
    ArgsProblemBoxComponent,
    ArgsInstcPickerBoxComponent,
    SolcnEvalBoxComponent,
    ImplmntBoxComponent,
    InstcBoxComponent,
    ArgsBoxComponent,
    ArgsImplmntEditorBoxComponent,
    OptmzdBoxComponent,
    ImplmntPickerBoxComponent,
    InstcPickerBoxComponent,
    ProblmBoxComponent,
    ProblmPickerBoxComponent,
    AlgrtmBoxComponent,
    AlgrtmPickerBoxComponent,
    ParamzProblemEditorBoxComponent,
    ParamEditorBoxComponent,
    ParamzAlgrtmEditorBoxComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,

    MarkdownModule.forRoot(),

    RouterModule,
  ],
  exports: [
    TagSearchBoxComponent,
    ParamzAlgorithmBoxComponent,
    ArgsAlgorithmBoxComponent,
    ImplmntEvalBoxComponent,
    ArgsImplmntPickerBoxComponent,
    ParamzProblemBoxComponent,
    InstcEvalBoxComponent,
    ArgsProblemBoxComponent,
    ArgsInstcPickerBoxComponent,
    SolcnEvalBoxComponent,
    ImplmntBoxComponent,
    InstcBoxComponent,
    ArgsBoxComponent,
    ArgsImplmntEditorBoxComponent,
    OptmzdBoxComponent,
    ImplmntPickerBoxComponent,
    InstcPickerBoxComponent,
    ProblmBoxComponent,
    ProblmPickerBoxComponent,
    AlgrtmBoxComponent,
    AlgrtmPickerBoxComponent,
    ParamzProblemEditorBoxComponent,
    ParamEditorBoxComponent,
    ParamzAlgrtmEditorBoxComponent,
  ]
})
export class ComponentsFeatureOptimizadoresModule { }