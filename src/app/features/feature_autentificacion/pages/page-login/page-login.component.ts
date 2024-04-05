import {
  Component,
  OnInit,
} from '@angular/core';

import axios from 'axios';


@Component({
  selector: 'myrmex-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})

export class PageLoginComponent implements OnInit {

  modo: 'In' | 'Up' = 'In';

  ngOnInit ( ) {
    // canActiveSirvio?
  }

}