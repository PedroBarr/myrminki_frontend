import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  register as swiperRegister,
} from 'swiper/element/bundle';

import {
  AboutSlide,
  ACERCA_DE_TIPOS_DIAPOSITIVA,
} from 'src/app/shared/models/about-slide.model';



swiperRegister();



@Component({
  selector: 'myrmex-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.scss'],
})
export class PageAboutComponent implements AfterViewChecked, OnInit {

  total_slides: number = 1;
  current_slide: number = 1;
  slides: AboutSlide[] = [];

  TIPOS_DIAPOSITIVA = ACERCA_DE_TIPOS_DIAPOSITIVA;

  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  constructor( ) { }

  ngOnInit() {
    this.loadSlides();
    this.current_slide = 0;
  }

  ngAfterViewChecked(): void {
    this.swiperRef?.nativeElement.swiper.update();
  }

  swiperSlideChanged ( ) {
    this.current_slide = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  setSlide(index: number) {
    this.current_slide = index + 1;
  }

  navNext() {
    this.swiperRef?.nativeElement.swiper.slideNext();
  }

  navPrev() {
    this.swiperRef?.nativeElement.swiper.slidePrev();
  }

  /**
  * Load slides from API
  */
  async loadSlides() {
    this.slides = [
      {
        tipoSlide: this.TIPOS_DIAPOSITIVA.TIPO_PANCARTA,
        titulo: 'Sistema Myrminki',
        subtitulo: 'Bienvenido.',
        imagen_pancarta:
          'http://localhost:4200/assets/img/icons/core/myrmex.svg',
        imagen_pancarta_texto_alternativo: 'Logo Myrminki',
      } as AboutSlide,
      {
        tipoSlide: this.TIPOS_DIAPOSITIVA.TIPO_DESCRIPTOR,
        titulo: 'Sistema Myrminki',
        subtitulo: 'Proyecto',
        imagen_descriptor:
          'http://localhost:4200/assets/img/icons/core/myrmex.svg',
        imagen_descriptor_texto_alternativo: 'Logo Myrminki',
        textos: [
          `El Sistema Myrminki es un proyecto enfocado en la difusion de estrategias de implementacion para la metaheuristica OCH (Optimizador de la Colonia de Hormigas).`,
          `Sirve de índice para diferentes implementaciones del OCH, con referentes biobliograficos actualizados por los usuarios e implementaciones de código ejecutables en vivo.`,
        ],
      } as AboutSlide,
      {
        tipoSlide: this.TIPOS_DIAPOSITIVA.TIPO_PAR_DESCRIPTORES,
        titulos_descriptores: ['Misión', 'Visión'],
        textos_descriptores: [
          [
            'Servir de centro de difusion de estrategias de implementacion de la metaheuristica OCH (Optimizador de la Colonia de Hormigas.',
          ],
          [
            'Ser acogido por diferentes centros acad\u00e9micos para ense\u00f1ar sobre los problemas de optimizacion y sus metodos de solucion. Adem\u00e1s, se pretente dar alcance a la mayor cantidad de estrategias de implementacion posibles para el Optimizador de la Colonia de Hormiga.',
            'También se busca prestar un servicio especializado para compañias que necesiten frecuentemente servicios de optimización en sus procesos internos, para que cuenten con una herramienta práctica que les permita sortear esta posibilidad',
          ],
        ],
      } as AboutSlide,
      {
        tipoSlide: this.TIPOS_DIAPOSITIVA.TIPO_PAR_DESCRIPTORES,
        titulos_descriptores: ['Alta Lengua', 'API de Myrminki'],
        subtitulos_descriptores: ['AL', undefined],
        textos_descriptores: [
          [
            'El grupo Alta Lengua sirve como grupo interdiciplinario de miembros con una empresa que promueve la literacidad general y el uso de tecnologias en la cotidianidad.',
          ],
          [
            'El API consumible de Myrminki sirve de backend para el Sistema Myrminki. Permite realizar peticiones relacionadas al objetivo del Sistema Myrminki.',
          ],
        ],
        imagenes_descriptores: [
          'http://localhost:4200/assets/img/icons/core/al.svg',
          'http://localhost:4200/assets/img/icons/core/myrmex.svg',
        ],
        imagenes_descriptores_textos_alternativos: [
          'Logo AL',
          'Logo Myrminki',
        ],
      } as AboutSlide,
    ];

    this.total_slides = this.slides.length;
  }

}