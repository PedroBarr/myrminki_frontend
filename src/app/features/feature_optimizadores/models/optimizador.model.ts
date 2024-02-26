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

  ruta_enlace ( ): string {
    return '/explorar';
  }

  lista_datos ( ): string[][] {
    return [];
  }

}

export class PrevisualizacionAlgoritmo extends PrevisualizacionEntrada {

  public id: number = 0;
  public n_parametros: number = 0;

  constructor (obj: any = {
    id: '',
    n_parametros: 0,
  }) {
    super(obj);
    this.tipo_entrada = 'ALGORITMO';
    this.id = obj.id;
    this.n_parametros = obj.n_parametros;
  }

  override ruta_enlace ( ): string {
    return '/algoritmo/' + this.id;
  }

  override lista_datos (): string[][] {
    return [
      ['N\u00famero de par\u00e1metros', String(this.n_parametros)],
    ];
  }

}

export class Algoritmo {

  public titulo: string;
  public etiquetas: string[];

  public descripcion_puntuada: string;
  public matematizacion_puntuada: string;
  public seudo_codigo_puntuado: string;

  public parametrizacion_id: string;

  constructor (obj: any = {
    titulo: '',
    etiquetas: [],
    descripcion_puntuada: '',
    matematizacion_puntuada: '',
    seudo_codigo_puntuado: '',
    parametrizacion_id: '',
  }) {
    this.titulo = obj.titulo;
    this.etiquetas = obj.etiquetas;
    this.descripcion_puntuada = obj.descripcion_puntuada;
    this.matematizacion_puntuada = obj.matematizacion_puntuada;
    this.seudo_codigo_puntuado = obj.seudo_codigo_puntuado;

    this.parametrizacion_id = obj.parametrizacion_id ?
      obj.parametrizacion_id :
      ''
    ;
  }

}

interface restriccion {
  tipo_restriccion: string;
  valor_restriccion: string;
};

export class ParametrizacionAlgoritmo {

  public nombre: string;
  public descripcion: string;
  public restricciones: restriccion[];
  public datos: {[clave_datos: string]: any};

  constructor (obj: any = {
    nombre: '',
    descripcion: '',
    restricciones: [],
    datos: {},
  }) {
    this.nombre = obj.nombre;
    this.descripcion = obj.descripcion;
    this.restricciones = obj.restricciones;
    this.datos = obj.datos;
  }

  have_datos ( ) {
    return Object.keys(this.datos).length > 0;
  }

  get_datos_list ( ): any[2][] {
    return Object.entries(this.datos);
  }

}