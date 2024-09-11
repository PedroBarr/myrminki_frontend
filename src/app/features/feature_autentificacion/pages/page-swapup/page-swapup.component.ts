import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'myrmex-page-swapup',
  templateUrl: './page-swapup.component.html',
  styleUrls: ['./page-swapup.component.scss']
})
export class PageSwapupComponent implements OnInit {

  simbolismo: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('simbolismo') !== null) {
      this.simbolismo = this.route.snapshot.paramMap.get('simbolismo') as string;
    }
  }
  
  esSimbolico ( ) {
    return this.simbolismo !== '' && this.simbolismo !== null;
  }

}
