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



swiperRegister();



@Component({
  selector: 'myrmex-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.scss'],
})
export class PageAboutComponent implements AfterViewChecked, OnInit {

  total_slides: number = 1;
  current_slide: number = 1;
  slides: any[] = [];

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

  /**
  * Go to next slide
  */
  navNext() {
    this.swiperRef?.nativeElement.swiper.update();
    if (this.current_slide == this.total_slides - 1) {
        this.current_slide = 0;
    } else {
        this.current_slide += 1;
    }
  }

  /**
  * Load slides from API
  */
  async loadSlides() {
    this.total_slides = 1;
  }

}