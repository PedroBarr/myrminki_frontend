import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';

import {
  PrevisualizacionEntrada,
} from '../../models/optimizador.model';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-optmzd-box',
  templateUrl: './optmzd-box.component.html',
  styleUrls: ['./optmzd-box.component.scss'],
})

export class OptmzdBoxComponent {

  @Input() optimizador: PrevisualizacionEntrada = new PrevisualizacionEntrada();
  @Input() es_selecto: boolean = false;
  @Input() opcion_previsualizar: boolean = false;
  @Input() tipo_accion: 'route' | 'emit' = 'route';
  @Output() emitir_accion = new EventEmitter<string>();
  @Output() emitir_visualizar = new EventEmitter<string>();

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  do_action (event: MouseEvent) {
    event.stopPropagation();

    switch (this.tipo_accion) {
      case 'emit':
        this.emitir_accion.emit(this.optimizador.get_id());
        break;
      case 'route':
      default:
        this.router.navigateByUrl(this.optimizador.ruta_enlace());
        break;
    }
  }

  es_habilitado_previsualizacion ( ): boolean {
    if (!this.opcion_previsualizar) return false;

    const previsualizaciones_habilitadas: string[] = [
      'IMPLEMENTACION',
      'INSTANCIA',
      'PROBLEMA',
      'ALGORITMO',
    ];

    if (
      !previsualizaciones_habilitadas.includes(
        String(this.optimizador.tipo_entrada)
      )
    )
      return false;

    return true;
  }

  do_previsualizacion (event: MouseEvent) {
    event.stopPropagation();
    this.emitir_visualizar.emit(this.optimizador.get_id());
  }

}