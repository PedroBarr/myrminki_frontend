export class PrevisualizacionEntrada {

  public tipo_entrada: 'ALGORITMO' | 'IMPLEMENTACION' | 'PROBLEMA' | undefined;
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
  public n_implementaciones: number = 0;

  constructor (obj: any = {
    id: '',
    n_parametros: 0,
    n_implementaciones: 0,
  }) {
    super(obj);
    this.tipo_entrada = 'ALGORITMO';
    this.id = obj.id;
    this.n_parametros = obj.n_parametros;
    this.n_implementaciones = obj.n_implementaciones;
  }

  override ruta_enlace ( ): string {
    return '/algoritmo/' + this.id;
  }

  override lista_datos (): string[][] {
    return [
      ['N\u00famero de par\u00e1metros', String(this.n_parametros)],
      ['N\u00famero de implementaciones', String(this.n_implementaciones)],
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

export class PrevisualizacionImplementacion extends PrevisualizacionEntrada {

  public id: number = 0;
  public n_parametros_algoritmo: number = 0;
  public n_argumentaciones: number = 0;
  public n_soluciones: number = 0;
  public lenguaje_programacion: string = '';

  constructor (obj: any = {
    id: '',
    n_parametros_algoritmo: 0,
    n_argumentaciones: 0,
    n_soluciones: 0,
    lenguaje_programacion: '',
  }) {
    super(obj);
    this.tipo_entrada = 'IMPLEMENTACION';
    this.id = obj.id;
    this.n_parametros_algoritmo = obj.n_parametros_algoritmo;
    this.n_argumentaciones = obj.n_argumentaciones;
    this.n_soluciones = obj.n_soluciones;
    this.lenguaje_programacion = obj.lenguaje_programacion;
  }

  override ruta_enlace ( ): string {
    return '/implementacion/' + this.id;
  }

  override lista_datos (): string[][] {
    return [
      [
        'N\u00famero de par\u00e1metros del algoritmo',
        String(this.n_parametros_algoritmo)
      ],
      ['N\u00famero de argumentaciones', String(this.n_argumentaciones)],
      ['N\u00famero de soluciones', String(this.n_soluciones)],
      ['Lenguaje de programaci\u00f3n', this.lenguaje_programacion]
    ];
  }

}

export class Implementacion {

  public titulo: string;
  public etiquetas: string[];

  public lenguaje_nombre: string;

  public descripcion_puntuada: string;
  public codigo_puntuado: string;

  public parametrizacion_id: string;

  constructor (obj: any = {
    titulo: '',
    etiquetas: [],
    lenguaje_nombre: '',
    descripcion_puntuada: '',
    codigo_puntuado: '',
    parametrizacion_id: '',
  }) {
    this.titulo = obj.titulo;
    this.etiquetas = obj.etiquetas;
    this.lenguaje_nombre = obj.lenguaje_nombre;
    this.descripcion_puntuada = obj.descripcion_puntuada;
    this.codigo_puntuado = obj.codigo_puntuado;

    this.parametrizacion_id = obj.parametrizacion_id ?
      obj.parametrizacion_id :
      ''
    ;
  }

  getLenguajeEtiqueta (): string {
    return (
      this.lenguaje_nombre.substring(0, 1).toUpperCase() +
      this.lenguaje_nombre.substring(1).toLowerCase()
    );
  }

}