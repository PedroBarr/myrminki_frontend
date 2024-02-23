export class PrevisualizacionEntrada {

  public tipo_entrada: 'ALGORITMO' | 'PROBLEMA' | undefined;
  public titulo_entrada: string = '';
  public etiquetas: string[] = [];

  constructor (obj: any = {
    titulo_entrada: '',
    etiquetas: [],
  }) {
    this.titulo_entrada = obj.titulo_entrada;
    this.etiquetas = obj.etiquetas;
  }

  ruta_enlace (): string {
    return '/explorar';
  }

}

export class PrevisualizacionAlgoritmo extends PrevisualizacionEntrada {

  public id: number = 0;

  constructor (obj: any = {
    id: '',
  }) {
    super(obj);
    this.tipo_entrada = 'ALGORITMO';
    this.id = obj.id;
  }

  override ruta_enlace (): string {
    return '/algoritmo/' + this.id;
  }

}