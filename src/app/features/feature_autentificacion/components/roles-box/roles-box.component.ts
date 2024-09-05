import { Component, Input, OnInit, OnChanges } from '@angular/core';

import {
  PermisoTipado,
} from '../../models/permisos.model';

@Component({
  selector: 'myrmex-roles-box',
  templateUrl: './roles-box.component.html',
  styleUrls: ['./roles-box.component.scss']
})
export class RolesBoxComponent implements OnInit, OnChanges {

  @Input() roles: PermisoTipado[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.roles);
  }
}
