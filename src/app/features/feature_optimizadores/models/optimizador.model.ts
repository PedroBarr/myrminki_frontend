export class PrevisualizacionEntrada {

  public tipo_entrada: 'ALGORITMO' | 'IMPLEMENTACION' | 'PROBLEMA' | 'INSTANCIA' | 'SOLUCION' | undefined;
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

  get_id ( ): string {
    return '';
  }

  lista_datos ( ): string[][] {
    return [];
  }

}

export class PrevisualizacionAlgoritmo extends PrevisualizacionEntrada {

  public id: string = '';
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

  override get_id ( ): string {
    return this.id;
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

  public algoritmo_id: string;
  public parametrizacion_id: string;

  constructor (obj: any = {}) {
    const {
      titulo = '',
      etiquetas = [],
      descripcion_puntuada = '',
      matematizacion_puntuada = '',
      seudo_codigo_puntuado = '',
      algoritmo_id = '',
      parametrizacion_id = '',
    } = obj;

    this.titulo = titulo;
    this.etiquetas = etiquetas;
    this.descripcion_puntuada = descripcion_puntuada;
    this.matematizacion_puntuada = matematizacion_puntuada;
    this.seudo_codigo_puntuado = seudo_codigo_puntuado;

    this.algoritmo_id = algoritmo_id ?
      algoritmo_id :
      ''
    ;

    this.parametrizacion_id = parametrizacion_id ?
      parametrizacion_id :
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

  get_dato ( clave_datos: string ): string {
    if (this.have_datos() && this.datos[clave_datos] != undefined)
      return this.datos[clave_datos].toString();
    return '';
  }

  set_dato ( clave_datos: string, valor: any ) {
    if (this.have_datos() && this.datos[clave_datos] != undefined)
      this.datos[clave_datos] = valor;
  }

}

export class PrevisualizacionImplementacion extends PrevisualizacionEntrada {

  public id: string = '';
  public nombre_algoritmo: string = '';
  public n_parametros_algoritmo: number = 0;
  public n_argumentaciones: number = 0;
  public n_soluciones: number = 0;
  public lenguaje_programacion: string = '';
  public parametros_algoritmo_id: string = '';

  constructor (obj: any) {
    const {
      id = '',
      nombre_algoritmo = '',
      n_parametros_algoritmo = 0,
      n_argumentaciones = 0,
      n_soluciones = 0,
      lenguaje_programacion = '',
      parametros_algoritmo_id = '',
    } = obj;

    super(obj);
    this.tipo_entrada = 'IMPLEMENTACION';
    this.id = id;
    this.nombre_algoritmo = nombre_algoritmo;
    this.n_parametros_algoritmo = n_parametros_algoritmo;
    this.n_argumentaciones = n_argumentaciones;
    this.n_soluciones = n_soluciones;
    this.lenguaje_programacion = lenguaje_programacion;

    this.parametros_algoritmo_id = parametros_algoritmo_id;
  }

  override ruta_enlace ( ): string {
    return '/implementacion/visor/' + this.id;
  }

  override get_id ( ): string {
    return this.id;
  }

  override lista_datos (): string[][] {
    const lista: string[][] = [];

    if (this.nombre_algoritmo != '')
      lista.push(['Nombre del algoritmo', this.nombre_algoritmo]);

    lista.push([
      'N\u00famero de par\u00e1metros del algoritmo',
      String(this.n_parametros_algoritmo)
    ]);

    lista.push([
      'N\u00famero de argumentaciones', String(this.n_argumentaciones)
    ]);

    lista.push(['N\u00famero de soluciones', String(this.n_soluciones)]);

    lista.push([
      'Lenguaje de programaci\u00f3n', this.lenguaje_programacion
    ]);

    return lista;
  }

}

export class Implementacion {

  public titulo: string;
  public etiquetas: string[];

  public lenguaje_nombre: string;

  public descripcion_puntuada: string;
  public codigo_puntuado: string;

  public implementacion_id: string;
  public algoritmo_id: string;
  public parametrizacion_id: string;

  constructor (obj: any = {}) {
    const {
      titulo = '',
      etiquetas = [],
      lenguaje_nombre = '',
      descripcion_puntuada = '',
      codigo_puntuado = '',
      implementacion_id = '',
      parametrizacion_id = '',
      algoritmo_id = '',
    } = obj;

    this.titulo = titulo;
    this.etiquetas = etiquetas;
    this.lenguaje_nombre = lenguaje_nombre;
    this.descripcion_puntuada = descripcion_puntuada;
    this.codigo_puntuado = codigo_puntuado;

    this.implementacion_id = implementacion_id ?
      implementacion_id :
      ''
    ;

    this.algoritmo_id = algoritmo_id ?
      algoritmo_id :
      ''
    ;

    this.parametrizacion_id = parametrizacion_id ?
      parametrizacion_id :
      ''
    ;
  }

  getLenguajeEtiqueta (): string {
    return (
      this.lenguaje_nombre.substring(0, 1).toUpperCase() +
      this.lenguaje_nombre.substring(1).toLowerCase()
    );
  }

  build_post(): {[clave: string]: any} {
    const post_data: {[clave: string]: any} = {
      /*
      problema: this.problema_id,
      lenguaje: this.lenguaje_nombre,
      nombre: this.titulo,
      descripcion: this.descripcion_puntuada,
      matematizacion: this.matematizacion_puntuada,
      codificacion: this.codigo_puntuado,
      */
    };

    /*
    post_data['diminutivo'] = (
      'instc_' +
      this.problema_id +
      '_' +
      (new Date().getTime())
    );

    if (this.instancia_id) {
      post_data['id'] = this.instancia_id;
    }
    */

    return post_data;
  }

}

export class ArgumentoParametrizacion {

  public id: string | null;

  public clave_id: string | null;
  public descripcion: string | null;
  public argumentos: {[clave_param: string]: string};
  public es_defecto: boolean;

  constructor (obj: any = {}) {
    const {
      id = null,
      clave_id = null,
      descripcion = null,
      argumentos = {},
      es_defecto = false,
    } = obj;

    this.id = id;
    this.clave_id = clave_id;
    this.descripcion = descripcion;
    this.argumentos = argumentos;
    this.es_defecto = es_defecto;
  }

  have_argumentos ( ) {
    return Object.keys(this.argumentos).length > 0;
  }

  get_argumentos_list ( ): any[2][] {
    return Object.entries(this.argumentos);
  }

  build_post(): {[clave: string]: any} {
    const post_data: {[clave: string]: any} = {
      diminutivo: this.clave_id,
      descripcion: this.descripcion,
      diccionario_argumentos: this.argumentos,
    };

    if (this.id) post_data['id'] = this.id;

    return post_data;
  }

}

export class PrevisualizacionProblema extends PrevisualizacionEntrada {

  public id: string = '';
  public parametros_problema_id: string = '';

  public n_parametros_problema: number = 0;
  public n_instancias: number = 0;

  constructor (obj: any = {}) {
    const {
      id = '',
      n_parametros_problema = 0,
      n_instancias = 0,
      parametros_problema_id = '',
    } = obj;

    super(obj);
    this.tipo_entrada = 'PROBLEMA';
    this.id = id;
    this.n_parametros_problema = n_parametros_problema;
    this.n_instancias = n_instancias;

    this.parametros_problema_id = (
      parametros_problema_id ?
      parametros_problema_id :
      ''
    );
  }

  override ruta_enlace ( ): string {
    return '/problema/' + this.id;
  }

  override get_id ( ): string {
    return this.id;
  }

  override lista_datos (): string[][] {
    return [
      [
        'N\u00famero de par\u00e1metros del problema',
        String(this.n_parametros_problema)
      ],
      ['N\u00famero de instancias', String(this.n_instancias)],
    ];
  }

}

export class Problema {

  public titulo: string;
  public etiquetas: string[];

  public descripcion_puntuada: string;
  public matematizacion_puntuada: string;

  public problema_id: string;
  public parametrizacion_id: string;

  constructor (obj: any = {}) {
    const {
      titulo = '',
      etiquetas = [],
      descripcion_puntuada = '',
      matematizacion_puntuada = '',
      problema_id = '',
      parametrizacion_id = '',
    } = obj;

    this.titulo = titulo;
    this.etiquetas = etiquetas;
    this.descripcion_puntuada = descripcion_puntuada;
    this.matematizacion_puntuada = matematizacion_puntuada;

    this.problema_id =
      problema_id ?
      problema_id :
      ''
    ;

    this.parametrizacion_id = parametrizacion_id ?
      parametrizacion_id :
      ''
    ;
  }

}

export class ParametrizacionProblema {

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

  get_dato ( clave_datos: string ): string {
    if (this.have_datos() && this.datos[clave_datos] != undefined)
      return this.datos[clave_datos].toString();
    return '';
  }

  set_dato ( clave_datos: string, valor: any ) {
    if (this.have_datos() && this.datos[clave_datos] != undefined)
      this.datos[clave_datos] = valor;
  }

}

export class PrevisualizacionInstancia extends PrevisualizacionEntrada {

  public id: string = '';
  public nombre_problema: string = '';
  public n_parametros_problema: number = 0;
  public n_argumentaciones: number = 0;
  public n_soluciones: number = 0;
  public lenguaje_programacion: string = '';
  public parametros_problema_id: string = '';

  constructor (obj: any) {
    const {
      id = '',
      nombre_problema = '',
      n_parametros_problema = 0,
      n_argumentaciones = 0,
      n_soluciones = 0,
      lenguaje_programacion = '',
      parametros_problema_id  = '',
    } = obj;

    super(obj);
    this.tipo_entrada = 'INSTANCIA';
    this.id = id;
    this.nombre_problema = nombre_problema;
    this.n_parametros_problema = n_parametros_problema;
    this.n_argumentaciones = n_argumentaciones;
    this.n_soluciones = n_soluciones;
    this.lenguaje_programacion = lenguaje_programacion;
    this.parametros_problema_id = parametros_problema_id;
  }

  override ruta_enlace ( ): string {
    return '/instancia/visor/' + this.id;
  }

  override get_id ( ): string {
    return this.id;
  }

  override lista_datos (): string[][] {
    const lista: string[][] = [];

    if (this.nombre_problema != '')
      lista.push(['Nombre del problema', this.nombre_problema]);
    lista.push([
      'N\u00famero de par\u00e1metros del problema',
      String(this.n_parametros_problema)
    ]);

    lista.push([
      'N\u00famero de argumentaciones',
      String(this.n_argumentaciones)
    ]);

    lista.push(['N\u00famero de soluciones', String(this.n_soluciones)]);
    lista.push(['Lenguaje de programaci\u00f3n', this.lenguaje_programacion]);

    return lista;
  }

}

export class Instancia {

  public titulo: string;
  public etiquetas: string[];

  public lenguaje_nombre: string;

  public descripcion_puntuada: string;
  public matematizacion_puntuada: string;
  public codigo_puntuado: string;

  public instancia_id: string;
  public problema_id: string;
  public parametrizacion_id: string;

  constructor (obj: any = {}) {
    const {
      titulo = '',
      etiquetas = [],
      lenguaje_nombre = '',
      descripcion_puntuada = '',
      matematizacion_puntuada = '',
      codigo_puntuado = '',
      instancia_id = '',
      problema_id = '',
      parametrizacion_id = '',
    } = obj;

    this.titulo = titulo;
    this.etiquetas = etiquetas;
    this.lenguaje_nombre = lenguaje_nombre;
    this.descripcion_puntuada = descripcion_puntuada;
    this.matematizacion_puntuada = matematizacion_puntuada;
    this.codigo_puntuado = codigo_puntuado;

    this.instancia_id = instancia_id ?
      instancia_id :
      ''
    ;

    this.problema_id = problema_id ?
      problema_id :
      ''
    ;

    this.parametrizacion_id = parametrizacion_id ?
      parametrizacion_id :
      ''
    ;
  }

  getLenguajeEtiqueta (): string {
    return (
      this.lenguaje_nombre.substring(0, 1).toUpperCase() +
      this.lenguaje_nombre.substring(1).toLowerCase()
    );
  }

  build_post(): {[clave: string]: any} {
    const post_data: {[clave: string]: any} = {
      problema: this.problema_id,
      lenguaje: this.lenguaje_nombre,
      nombre: this.titulo,
      descripcion: this.descripcion_puntuada,
      matematizacion: this.matematizacion_puntuada,
      codificacion: this.codigo_puntuado,
    };

    post_data['diminutivo'] = (
      'instc_' +
      this.problema_id +
      '_' +
      (new Date().getTime())
    );

    if (this.instancia_id) {
      post_data['id'] = this.instancia_id;
    }

    return post_data;
  }

}

export class PrevisualizacionSolucion extends PrevisualizacionEntrada {

  public id: string = '';
  public lenguaje_programacion: string = '';

  public nombre_algoritmo: string = '';
  public n_parametros_algoritmo: number = 0;
  public lenguaje_programacion_implementacion: string = '';

  public nombre_problema: string = '';
  public n_parametros_problema: number = 0;
  public lenguaje_programacion_instancia: string = '';

  constructor (obj: any = {
    id: '',
    lenguaje_programacion: '',
    nombre_algoritmo: '',
    n_parametros_algoritmo: 0,
    lenguaje_programacion_implementacion: '',
    nombre_problema: '',
    n_parametros_problema: 0,
    lenguaje_programacion_instancia: '',
  }) {
    super(obj);
    this.tipo_entrada = 'SOLUCION';
    this.id = obj.id;
    this.lenguaje_programacion = obj.lenguaje_programacion;
    this.nombre_algoritmo = obj.nombre_algoritmo;
    this.n_parametros_algoritmo = obj.n_parametros_algoritmo;

    this.lenguaje_programacion_implementacion = (
      obj.lenguaje_programacion_implementacion
    );

    this.nombre_problema = obj.nombre_problema;
    this.n_parametros_problema = obj.n_parametros_problema;

    this.lenguaje_programacion_instancia = (
      obj.lenguaje_programacion_instancia
    );
  }

  override ruta_enlace ( ): string {
    return '/solucion/visor/' + this.id;
  }

  override get_id ( ): string {
    return this.id;
  }

  override lista_datos (): string[][] {
    const lista: string[][] = [];

    lista.push([
      'Lenguaje de programaci\u00f3n',
      String(this.lenguaje_programacion
    )]);

    lista.push(['Nombre del algoritmo', String(this.nombre_algoritmo)]);

    lista.push([
      'N\u00famero de par\u00e1metros del algoritmo',
      String(this.n_parametros_algoritmo
    )]);

    lista.push([
      'Lenguaje de programaci\u00f3n de la implementaci\u00f3n',
      String(this.lenguaje_programacion_implementacion)
    ]);

    lista.push(['Nombre del problema', String(this.nombre_problema)]);

    lista.push([
      'N\u00famero de par\u00e1metros del problema',
      String(this.n_parametros_problema)
    ]);

    lista.push([
      'Lenguaje de programaci\u00f3n de la instancia',
      String(this.lenguaje_programacion_instancia)
    ]);

    return lista;
  }

}

export class Solucion {

  public titulo: string;
  public etiquetas: string[];

  public lenguaje_nombre: string;

  public codigo_puntuado: string;

  public solucion_id: string;
  public implementacion_id: string;
  public argumentacion_implementacion_id: string;
  public instancia_id: string;
  public argumentacion_instancia_id: string;

  constructor (obj: any = {}) {
    const {
      titulo = '',
      etiquetas = [],
      lenguaje_nombre = '',
      codigo_puntuado = '',
      solucion_id = '',
      implementacion_id = '',
      argumentacion_implementacion_id = '',
      instancia_id = '',
      argumentacion_instancia_id = '',
    } = obj;

    this.titulo = obj.titulo;
    this.etiquetas = obj.etiquetas;
    this.lenguaje_nombre = obj.lenguaje_nombre;
    this.codigo_puntuado = obj.codigo_puntuado;

    this.solucion_id = obj.solucion_id ?
      obj.solucion_id :
      ''
    ;

    this.implementacion_id = obj.implementacion_id ?
      obj.implementacion_id :
      ''
    ;

    this.argumentacion_implementacion_id = (
      obj.argumentacion_implementacion_id ?
      obj.argumentacion_implementacion_id :
      ''
    );

    this.instancia_id = obj.instancia_id ?
      obj.instancia_id :
      ''
    ;

    this.argumentacion_instancia_id = obj.argumentacion_instancia_id ?
      obj.argumentacion_instancia_id :
      ''
    ;
  }

  getLenguajeEtiqueta (): string {
    return (
      this.lenguaje_nombre.substring(0, 1).toUpperCase() +
      this.lenguaje_nombre.substring(1).toLowerCase()
    );
  }

  build_post(): {[clave: string]: any} {
    const post_data: {[clave: string]: any} = {
      argumentacion_instancia: this.argumentacion_instancia_id,
      instancia: this.instancia_id,
      argumentacion_solucion: this.argumentacion_implementacion_id,
      implementacion: this.implementacion_id,
      lenguaje: this.lenguaje_nombre,
      nombre: this.titulo,
      codificacion: this.codigo_puntuado,
    };

    post_data['diminutivo'] = (
      'solcn_' +
      this.implementacion_id +
      '_' +
      this.instancia_id +
      '_' +
      (new Date().getTime())
    );

    if (this.solucion_id) {
      post_data['id'] = this.solucion_id;
    }

    return post_data;
  }

}