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

import axios from 'axios';

import {
  AboutSlide,
  ACERCA_DE_TIPOS_DIAPOSITIVA,
} from 'src/app/shared/models/about-slide.model';

import { environment } from 'src/environments/environment';


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
    const slides: AboutSlide[] = [];

    axios.get(
      environment.MYRMEX_API + '/acerca_de'
    )
      .then(response => {
        console.log(response.data);
        const data = response.data;

        if (data.nombre) {
          slides.push({
            tipoSlide: this.TIPOS_DIAPOSITIVA.TIPO_PANCARTA,
            titulo: data.nombre,
            subtitulo: 'Bienvenido.',
            imagen_pancarta: environment.MYRMEX_ASSETS + data.imagen,
            imagen_pancarta_texto_alternativo: 'Logo ' + data.diminutivo,
          } as AboutSlide);

          slides.push({
            tipoSlide: this.TIPOS_DIAPOSITIVA.TIPO_DESCRIPTOR,
            titulo: data.nombre,
            subtitulo: data.rol,
            imagen_descriptor: environment.MYRMEX_ASSETS + data.imagen,
            imagen_descriptor_texto_alternativo: 'Logo ' + data.diminutivo,
            textos: data.descripcion.split('\n'),
          } as AboutSlide,);
        }

        if (data.descriptores) {
          for (
            let i_descriptor = 0;
            i_descriptor < data.descriptores.length;
            i_descriptor++
          ) {
            const descriptor: any = data.descriptores[i_descriptor];

            if (i_descriptor % 2 == 0) {
              slides.push({
                tipoSlide: this.TIPOS_DIAPOSITIVA.TIPO_PAR_DESCRIPTORES,
                titulos_descriptores: [descriptor.nombre],
                textos_descriptores: [
                  descriptor.descripcion.split('\n')
                ],
              } as AboutSlide);
            } else {
              slides[slides.length-1]["titulos_descriptores"]?.push(descriptor.nombre);
              slides[slides.length-1]["textos_descriptores"]?.push(descriptor.descripcion.split('\n'));
            }
          }
        }

        if (data.colaboradores) {
          for (
            let i_colaborador = 0;
            i_colaborador < data.colaboradores.length;
            i_colaborador++
          ) {
            const colaborador: any = data.colaboradores[i_colaborador];

            if (i_colaborador % 2 == 0) {
              slides.push({
                tipoSlide: this.TIPOS_DIAPOSITIVA.TIPO_PAR_DESCRIPTORES,
                titulos_descriptores: [colaborador.nombre],
                subtitulos_descriptores: [
                  (colaborador.rol.toLowerCase() == 'colaborador' ? colaborador.diminutivo : undefined)
                ],
                textos_descriptores: [colaborador.descripcion.split('\n')],
                imagenes_descriptores: [
                  environment.MYRMEX_ASSETS + colaborador.imagen
                ],
                imagenes_descriptores_textos_alternativos: [
                  'Logo ' + colaborador.diminutivo
                ],
              } as AboutSlide);
            } else {
              slides[slides.length-1]["titulos_descriptores"]?.push(
                colaborador.nombre
              );
              slides[slides.length-1]["subtitulos_descriptores"]?.push(
                (colaborador.rol.toLowerCase() == 'colaborador' ? colaborador.diminutivo : undefined)
              );
              slides[slides.length-1]["textos_descriptores"]?.push(
                colaborador.descripcion.split('\n')
              );
              slides[slides.length-1]["imagenes_descriptores"]?.push(
                environment.MYRMEX_ASSETS + colaborador.imagen
              );
              slides[slides.length-1]["imagenes_descriptores_textos_alternativos"]?.push(
                'Logo ' + colaborador.diminutivo
              );
            }
          }
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.slides = slides;
        this.total_slides = this.slides.length;
      });
  }

}