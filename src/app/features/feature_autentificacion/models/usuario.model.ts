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

    this.nombre_completo = this.nombres + ' ' + this.apellidos;
  }
      
  public getNombreCompleto ( ) {
    return this.nombre_completo;
  }

}