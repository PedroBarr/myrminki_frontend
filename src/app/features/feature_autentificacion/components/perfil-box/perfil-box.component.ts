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

  @Input() public perfil: UsuarioPerfil = new UsuarioPerfil();

  constructor() { }

  ngOnInit(): void {
  }

}
