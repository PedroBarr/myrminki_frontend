import {
  Component,
  OnInit,
} from '@angular/core';

import axios from 'axios';

import { pageDescriptores } from '../../constants/descriptor.constant';

import { Tutorial } from '../../models/tutorial.model'

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-page-tutorials',
  templateUrl: './page-tutorials.component.html',
  styleUrls: ['./page-tutorials.component.scss'],
})

export class PageTutorialsComponent implements OnInit {

  pageDescriptor: string = pageDescriptores['tutoriales'];

  tutorials: Tutorial[] = [];

  ngOnInit ( ) {
    this.loadTutorials();
  }

  /**
  * Load references from API
  */
  async loadTutorials ( ) {
    axios.get(
      environment.MYRMEX_API + '/tutoriales'
    )
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.length) {
          this.tutorials = response.data.map((tutorial: any) => ({
            descripcion: tutorial.descripcion,
            enlace: tutorial.enlace,
            ruta: tutorial.ruta,
          } as Tutorial));
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(( ) => { });
  }

}