import {
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';

@Component({
  selector: 'myrmex-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})

export class BackgroundComponent implements OnInit {

  @ViewChild(
      'interactive_background',
      { static: true }
  ) miCanvas!: ElementRef;

  _codigo: string;
  matriz_fondo: number[][] = [[0]];

  constructor ( ) {
    this._codigo = ".";
  }

  init_matriz (filas:number, columnas: number) {
    this.matriz_fondo =
      Array.from(
          Array(filas), _ =>
          Array(columnas).fill(0)
      );
  }

  init_canvas ( ) {
    const canvas: HTMLCanvasElement = this.miCanvas.nativeElement;
    const context = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const largo_ajust = Number((canvas.clientWidth/2).toFixed());
    const alto_ajust = Number((canvas.clientHeight/2).toFixed());
    this.init_matriz(alto_ajust, largo_ajust);
    /*if (context) {
      context.fillRect(
        0, 0,
        100,
        122
    );
    }*/
  }

  ngOnInit ( ) {
    this.init_canvas();
    const canvas: HTMLCanvasElement = this.miCanvas.nativeElement;
    canvas.addEventListener(
      "mousedown",
      (evt: MouseEvent) => {
        this.interaccion_mouse(evt);
      }
    );

    canvas.addEventListener(
      "contextmenu",
      (evt: MouseEvent) => {
        evt.preventDefault();
        this.interaccion_mouse_alter(evt);
      }
    );

    canvas.addEventListener(
      "dblclick",
      (evt: MouseEvent) => {
        evt.preventDefault();
        this.interaccion_mouse_alter2(evt);
      }
    );

    canvas.addEventListener(
      "mouseup",
      (evt: MouseEvent) => {
        canvas.removeEventListener("mousemove",this.interaccion_mouse)
      }
    );

  }

  alRedimensionar (e: Event) {
    this.init_canvas();
  }

  activarJuegoMyrmex (e: KeyboardEvent) {
    if (e.key == this._codigo.at(-1)) {
      switch (this._codigo) {
        case ".":
          this._codigo = ".m";
          break;
        case ".m":
          this._codigo = ".my";
          break;
        case ".my":
          this._codigo = ".myr";
          break;
        case ".myr":
          this._codigo = ".myrm";
          break;
        case ".myrm":
          this._codigo = ".myrme";
          break;
        case ".myrme":
          this._codigo = ".myrmex";
          break;
        case ".myrmex":
          this._codigo = ".myrmex.";
          break;
        case ".myrmex.":
          alert("this._easteregg.active()");
          this._codigo = ".";
          break;
        default:
          this._codigo = ".";
          break;
      }
    } else {
      this._codigo = ".";
    }
  }

  interaccion_bit (xPosCanvas: number, yPosCanvas: number, bit: number) {
    try {
      if (
          bit === 1 &&
          this.matriz_fondo[yPosCanvas][xPosCanvas] != 2
      ) {
        this.matriz_fondo[yPosCanvas][xPosCanvas] = bit;
      }
      if (bit === 2) {
        this.matriz_fondo[yPosCanvas][xPosCanvas] = bit;
      }
    } catch (error) { }
  }

  interaccion_mouse (evt: MouseEvent) {
    this.#interactuar(evt.clientX,evt.clientY);
  }

  interaccion_mouse_alter (evt: MouseEvent) {
    this.#interactuar_alter(evt.clientX,evt.clientY);
  }

  interaccion_mouse_alter2 (evt: MouseEvent) {
    this.#interactuar_alter2(evt.clientX,evt.clientY);
  }

  #interactuar(xPosMouse: number, yPosMouse: number) {
    const xPosCanvas = Number((xPosMouse/2).toFixed());
    const yPosCanvas = Number((yPosMouse/2).toFixed());

    switch (Math.floor(Math.random() * (7 - 1) + 1)) {
      case 1:
      case 4:
        for (let i = 0; i < 2; i++){
          this.interaccion_bit(xPosCanvas-1+i, yPosCanvas-3, 1);
          this.interaccion_bit(xPosCanvas+1-i, yPosCanvas-3, 1);
          this.interaccion_bit(xPosCanvas-1+i, yPosCanvas+3, 1);
          this.interaccion_bit(xPosCanvas+1-i, yPosCanvas+3, 1);
        }

        this.interaccion_bit(xPosCanvas-2, yPosCanvas-2, 1);
        this.interaccion_bit(xPosCanvas+2, yPosCanvas-2, 1);
        this.interaccion_bit(xPosCanvas-2, yPosCanvas+2, 1);
        this.interaccion_bit(xPosCanvas+2, yPosCanvas+2, 1);

        for (let i = 0; i < 2; i++){
          this.interaccion_bit(xPosCanvas-1+i, yPosCanvas-2, 2);
          this.interaccion_bit(xPosCanvas+1-i, yPosCanvas-2, 2);
          this.interaccion_bit(xPosCanvas-1+i, yPosCanvas+2, 2);
          this.interaccion_bit(xPosCanvas+1-i, yPosCanvas+2, 2);
        }

        for (let j = 0; j < 2; j++){
          this.interaccion_bit(xPosCanvas-3, yPosCanvas-1+j, 1);
          this.interaccion_bit(xPosCanvas+3, yPosCanvas-1+j, 1);
          this.interaccion_bit(xPosCanvas-3, yPosCanvas+1-j, 1);
          this.interaccion_bit(xPosCanvas+3, yPosCanvas+1-j, 1);

          for (let i = 0; i < 3; i++){
            this.interaccion_bit(xPosCanvas-2+i, yPosCanvas-1+j, 2);
            this.interaccion_bit(xPosCanvas+2-i, yPosCanvas-1+j, 2);
            this.interaccion_bit(xPosCanvas-2+i, yPosCanvas+1-j, 2);
            this.interaccion_bit(xPosCanvas+2-i, yPosCanvas+1-j, 2);
          }
        }

        break;

      case 2:
      case 5:
      case 6:
        for (let i = 0; i < 4; i++){
          this.interaccion_bit(xPosCanvas-3+i, yPosCanvas-7, 1);
          this.interaccion_bit(xPosCanvas+3-i, yPosCanvas-7, 1);
          this.interaccion_bit(xPosCanvas-3+i, yPosCanvas+7, 1);
          this.interaccion_bit(xPosCanvas+3-i, yPosCanvas+7, 1);
        }

        for (let j = 0; j < 3; j ++) {
          this.interaccion_bit(xPosCanvas-4-j, yPosCanvas-6+j, 1);
          this.interaccion_bit(xPosCanvas+4+j, yPosCanvas-6+j, 1);
          this.interaccion_bit(xPosCanvas-4-j, yPosCanvas+6-j, 1);
          this.interaccion_bit(xPosCanvas+4+j, yPosCanvas+6-j, 1);

          for (let i = 0; i < 4+j; i++){
            this.interaccion_bit(xPosCanvas-3-j+i, yPosCanvas-6+j, 2);
            this.interaccion_bit(xPosCanvas+3+j-i, yPosCanvas-6+j, 2);
            this.interaccion_bit(xPosCanvas-3-j+i, yPosCanvas+6-j, 2);
            this.interaccion_bit(xPosCanvas+3+j-i, yPosCanvas+6-j, 2);
          }
        }

        for (let j = 0; j < 4; j++){
          this.interaccion_bit(xPosCanvas-7, yPosCanvas-3+j, 1);
          this.interaccion_bit(xPosCanvas+7, yPosCanvas-3+j, 1);
          this.interaccion_bit(xPosCanvas-7, yPosCanvas+3-j, 1);
          this.interaccion_bit(xPosCanvas+7, yPosCanvas+3-j, 1);

          for (let i = 0; i < 6; i++){
            this.interaccion_bit(xPosCanvas-5+i, yPosCanvas-3+j, 2);
            this.interaccion_bit(xPosCanvas+5-i, yPosCanvas-3+j, 2);
            this.interaccion_bit(xPosCanvas-5+i, yPosCanvas+3-j, 2);
            this.interaccion_bit(xPosCanvas+5-i, yPosCanvas+3-j, 2);
          }
        }

        break;

      case 3:
        for (let i = 0; i < 4; i++){
          this.interaccion_bit(xPosCanvas-3+i, yPosCanvas-12, 1);
          this.interaccion_bit(xPosCanvas+3-i, yPosCanvas-12, 1);
          this.interaccion_bit(xPosCanvas-3+i, yPosCanvas+12, 1);
          this.interaccion_bit(xPosCanvas+3-i, yPosCanvas+12, 1);
        }

        for (let i = 0; i < 2; i++){
          this.interaccion_bit(xPosCanvas-5+i, yPosCanvas-11, 1);
          this.interaccion_bit(xPosCanvas+5-i, yPosCanvas-11, 1);
          this.interaccion_bit(xPosCanvas-5+i, yPosCanvas+11, 1);
          this.interaccion_bit(xPosCanvas+5-i, yPosCanvas+11, 1);
        }

        for (let i = 0; i < 4; i++){
          this.interaccion_bit(xPosCanvas-3+i, yPosCanvas-11, 2);
          this.interaccion_bit(xPosCanvas+3-i, yPosCanvas-11, 2);
          this.interaccion_bit(xPosCanvas-3+i, yPosCanvas+11, 2);
          this.interaccion_bit(xPosCanvas+3-i, yPosCanvas+11, 2);
        }

        for (let j = 0; j < 5; j ++) {
          this.interaccion_bit(xPosCanvas-6-j, yPosCanvas-10+j, 1);
          this.interaccion_bit(xPosCanvas+6+j, yPosCanvas-10+j, 1);
          this.interaccion_bit(xPosCanvas-6-j, yPosCanvas+10-j, 1);
          this.interaccion_bit(xPosCanvas+6+j, yPosCanvas+10-j, 1);

          for (let i = 0; i < 6+j; i++){
            this.interaccion_bit(xPosCanvas-5-j+i, yPosCanvas-10+j, 2);
            this.interaccion_bit(xPosCanvas+5+j-i, yPosCanvas-10+j, 2);
            this.interaccion_bit(xPosCanvas-5-j+i, yPosCanvas+10-j, 2);
            this.interaccion_bit(xPosCanvas+5+j-i, yPosCanvas+10-j, 2);
          }
        }

        for (let j = 0; j < 2; j++){
          this.interaccion_bit(xPosCanvas-11, yPosCanvas-5+j, 1);
          this.interaccion_bit(xPosCanvas+11, yPosCanvas-5+j, 1);
          this.interaccion_bit(xPosCanvas-11, yPosCanvas+5-j, 1);
          this.interaccion_bit(xPosCanvas+11, yPosCanvas+5-j, 1);

          for (let i = 0; i < 10; i++){
            this.interaccion_bit(xPosCanvas-9+i, yPosCanvas-5+j, 2);
            this.interaccion_bit(xPosCanvas+9-i, yPosCanvas-5+j, 2);
            this.interaccion_bit(xPosCanvas-9+i, yPosCanvas+5-j, 2);
            this.interaccion_bit(xPosCanvas+9-i, yPosCanvas+5-j, 2);
          }
        }

        for (let j = 0; j < 4; j++){
          this.interaccion_bit(xPosCanvas-12, yPosCanvas-3+j, 1);
          this.interaccion_bit(xPosCanvas+12, yPosCanvas-3+j, 1);
          this.interaccion_bit(xPosCanvas-12, yPosCanvas+3-j, 1);
          this.interaccion_bit(xPosCanvas+12, yPosCanvas+3-j, 1);

          for (let i = 0; i < 11; i++){
            this.interaccion_bit(xPosCanvas-10+i, yPosCanvas-3+j, 2);
            this.interaccion_bit(xPosCanvas+10-i, yPosCanvas-3+j, 2);
            this.interaccion_bit(xPosCanvas-10+i, yPosCanvas+3-j, 2);
            this.interaccion_bit(xPosCanvas+10-i, yPosCanvas+3-j, 2);
          }
        }
        break;

      default:
        this.interaccion_bit(xPosCanvas, yPosCanvas, 1);
        break;
    }

    const canvas: HTMLCanvasElement = this.miCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      this.#dibujar(context);
    }

  }

  #interactuar_alter(xPosMouse: number, yPosMouse: number) {
    const data = {
        dist: Math.floor(Math.random() * (61 - 40) + 40),
        paso: Math.floor(Math.random() * (7 - 5) + 5),
        cant: 0};

    data.cant = data.paso * 2;
    data.paso = Math.floor(data.dist/data.paso);

    switch (Math.floor(Math.random() * (6 - 1) + 1)) {
      case 1:
      case 3:
        for (let i = 0; i < data.cant; i++){
          let varianza = 0;
          switch (Math.floor(Math.random() * (4 - 1) + 1)) {
            case 1: varianza = 1;break;
            case 2: varianza = -1;break;
            default: varianza = 0;break;
          }

          this.#interactuar(
              xPosMouse-data.dist+(data.paso*i),
              yPosMouse-(3*varianza)
          );

        }

        break;

      case 2:
      case 4:
        for (let i = 0; i < data.cant; i++){
          let varianza = 0;
          switch (Math.floor(Math.random() * (4 - 1) + 1)) {
            case 1: varianza = 1;break;
            case 2: varianza = -1;break;
            default: varianza = 0;break;
          }

          this.#interactuar(
              xPosMouse-(3*varianza),
              yPosMouse-data.dist+(data.paso*i)
          );

        }

        break;

      default:
        for (let i = 0; i < data.cant; i++){
          let varianza = 0;
          switch (Math.floor(Math.random() * (4 - 1) + 1)) {
            case 1: varianza = 1;break;
            case 2: varianza = -1;break;
            default: varianza = 0;break;
          }

          switch (Math.floor(Math.random() * (3 - 1) + 1)) {
            case 1:
              this.#interactuar(
                  xPosMouse-data.dist+(data.paso*i),
                  yPosMouse-(3*varianza)
              );

              break;

            default:
              this.#interactuar(
                  xPosMouse-(3*varianza),
                  yPosMouse-data.dist+(data.paso*i)
              );

              break;
          }

        }

        break;
    }

    const canvas: HTMLCanvasElement = this.miCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      this.#dibujar(context);
    }
  }

  #interactuar_alter2(xPosMouse: number, yPosMouse: number) {
    const dist = Math.floor(Math.random() * (101 - 70) + 70);

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        this.#interactuar_alter(xPosMouse-Math.floor(dist/2)+(i*dist), yPosMouse-Math.floor(dist/2)+(j*dist));
      }
    }
  }

  #dibujar(context: CanvasRenderingContext2D) {
    context.clearRect(
        0, 0,
        this.miCanvas.nativeElement.clientWidth,
        this.miCanvas.nativeElement.clientHeight
    );

    for (
        let fila = 0;
        fila < this.matriz_fondo.length;
        fila++
    ) {

      for (
          let casilla = 0;
          casilla < this.matriz_fondo[fila].length;
          casilla++
      ) {

        if (this.matriz_fondo[fila][casilla] != 0) {

          if (this.matriz_fondo[fila][casilla] == 1) {
            context.fillStyle = "#777";
          }
          if (this.matriz_fondo[fila][casilla] == 2) {
            context.fillStyle = "#fff";
          }

          context.beginPath();
          context.fillRect(casilla * 2, fila * 2, 2, 2);
          context.fill();
        }

      }

    }

  }

}