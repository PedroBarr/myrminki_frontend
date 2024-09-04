export class UsuarioPerfil {
  public id: string;

  public correo: string;
  public apodo: string;

  public nombres: string;
  public apellidos: string;

  private nombre_completo: string;
  
  public constructor (
    obj: any = {
        id: null,
        correo: null,
        apodo: null,
        nombres: null,
        apellidos: null,
    }
  ) {
    this.id = obj.id;
    this.correo = obj.correo;
    this.apodo = obj.apodo;
    this.nombres = obj.nombres;
    this.apellidos = obj.apellidos;

    this.deducirNombres(obj);

    this.nombre_completo = this.nombres + ' ' + this.apellidos;
  }
      
  public getNombreCompleto ( ) {
    return this.nombre_completo;
  }

  public deducirNombres(
    obj: any = {
      nombres: null,
      apellidos: null,
      nombre: null,
    }
  ) {
    if (obj.nombres == null && obj.apellidos == null && obj.nombre != null) {
      const espacios = obj.nombre.split(' ').length - 1;
      if (espacios == 1) {
        const nombres = obj.nombre.split(' ');
        this.nombres = nombres[0];
        this.apellidos = nombres[1];
      } else if (espacios > 1) {
        // separar nombre a partir del segundo espacio
        const nombres = obj.nombre.split(' ');
        this.nombres = nombres[0] + ' ' + nombres[1];
        this.apellidos = nombres.slice(2).join(' ');
      } else {
        this.nombres = obj.nombre;
        this.apellidos = '';
      }
    }
  }

}

export enum UsuarioPerfilVistaHabilitada {
  profile = 'profile', // profile of user logged
  user = 'user', // profile of other user
  none = 'none', // no profile
}