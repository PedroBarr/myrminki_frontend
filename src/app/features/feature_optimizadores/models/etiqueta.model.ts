export class Etiqueta {
  public id: string = '';
  public etiqueta: string = '';
  public descripcion: string | null = null;

  constructor ( ) { }

  fill_obj (obj: any = {}) {
    const {
      id = '',
      etiqueta = '',
      descripcion = null,
    } = obj;

    this.id = id;
    this.etiqueta = etiqueta;
    this.descripcion = descripcion;
  }

  build_post ( ): {[clave: string]: any} {
    return {
      id: this.id,
      etiqueta: this.etiqueta,
      descripcion: this.descripcion,
    };
  }

}