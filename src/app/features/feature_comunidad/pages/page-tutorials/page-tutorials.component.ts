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
    this.tutorials = [
      {
        descripcion: 'En este video se presenta el tutorial de inicio de sesi\u00f3n del aplicativo',
        enlace: 'https://youtu.be/xx0x0XxXxXX',
        ruta: '/iniciar_sesion',
      } as Tutorial,
      {
        descripcion: 'En este video se presenta el tutorial de inicio de sesi\u00f3n del aplicativo',
        enlace: 'https://youtu.be/xx0x0XxXxXX',
        ruta: '/iniciar_sesion',
      } as Tutorial,
      {
        descripcion: 'En este video se presenta el tutorial de inicio de sesi\u00f3n del aplicativo',
        enlace: 'https://youtu.be/xx0x0XxXxXX',
        ruta: '/iniciar_sesion',
      } as Tutorial,
      {
        descripcion: 'En este video se presenta el tutorial de inicio de sesi\u00f3n del aplicativo',
        enlace: 'https://youtu.be/xx0x0XxXxXX',
        ruta: '/iniciar_sesion',
      } as Tutorial,
      {
        descripcion: 'En este video se presenta el tutorial de inicio de sesi\u00f3n del aplicativo',
        enlace: 'https://youtu.be/xx0x0XxXxXX',
        ruta: '/iniciar_sesion',
      } as Tutorial,
    ];
  }

}