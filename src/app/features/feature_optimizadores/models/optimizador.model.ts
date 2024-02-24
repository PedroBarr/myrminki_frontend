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

export class Algoritmo {

  public titulo: string;
  public etiquetas: string[];

  public descripcion_puntuada: string;
  public matematizacion_puntuada: string;
  public seudo_codigo_puntuado: string;

  constructor (obj: any = {
    titulo: '',
    etiquetas: [],
    descripcion_puntuada: '',
    matematizacion_puntuada: '',
    seudo_codigo_puntuado: '',
  }) {
    this.titulo = obj.titulo;
    this.etiquetas = obj.etiquetas;
    this.descripcion_puntuada = obj.descripcion_puntuada;
    this.matematizacion_puntuada = obj.matematizacion_puntuada;
    this.seudo_codigo_puntuado = obj.seudo_codigo_puntuado;
  }

}