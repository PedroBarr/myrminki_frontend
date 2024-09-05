import { Component, Input, OnInit } from '@angular/core';

import {
  PermisoTipado,
} from '../../models/permisos.model';

@Component({
  selector: 'myrmex-roles-box',
  templateUrl: './roles-box.component.html',
  styleUrls: ['./roles-box.component.scss']
})
export class RolesBoxComponent implements OnInit {

  @Input() roles: PermisoTipado[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
