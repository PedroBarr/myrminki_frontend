import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = 'myrminki-frontend';
  currentEvent: MouseEvent | null = null;

  _codigo: string;

  constructor () {
    this._codigo = ".";
  }

  ngOnInit ( ) {
    window.addEventListener('keydown', this.activarJuegoMyrmex.bind(this));
  }

  handleBodyClick (evt: MouseEvent) {
    evt.preventDefault();
    this.currentEvent = evt;
  }

  handleStopPropagation (evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
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
          this.juegoMyrmex();
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

  juegoMyrmex ( ) {
    const active: Boolean = confirm(
      "Para activar el huevo de pascua presione aceptar"
    );
    if (active) {
      this.currentEvent = new MouseEvent("easterEggEvent", { });
    }
  }

}
