import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import {
  UsuarioPerfil,
} from '../../models/usuario.model';

@Component({
  selector: 'myrmex-perfil-box',
  templateUrl: './perfil-box.component.html',
  styleUrls: ['./perfil-box.component.scss']
})
export class PerfilBoxComponent implements OnInit {

  @Input() public subtitulo: string = '';
  @Input() public perfil: UsuarioPerfil = new UsuarioPerfil();
  @Input() public is_edit_mode: boolean = false;
  @Input() public es_correo_visible: boolean = false;

  constructor( ) { }

  ngOnInit( ): void { }

}
