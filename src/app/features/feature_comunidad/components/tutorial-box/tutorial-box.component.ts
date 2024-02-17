import {
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

import { Tutorial } from '../../models/tutorial.model'

@Component({
  selector: 'myrmex-tutorial-box',
  templateUrl: './tutorial-box.component.html',
  styleUrls: ['./tutorial-box.component.scss'],
})

export class TutorialBoxComponent implements OnChanges {

  URLSeguro: SafeResourceUrl | null = null;

  @Input() tutorial: Tutorial = <Tutorial>{};

  constructor (
    private _sanitizador: DomSanitizer,
  ) {}

  ngOnChanges ( changes: any ) {
    if (changes.tutorial.firstChange) {
      this.URLSeguro = this._sanitizador
        .bypassSecurityTrustResourceUrl(
          changes.tutorial.currentValue.enlace
        )
    }
  }

}