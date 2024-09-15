export enum TipoContenidoEnum {
  libro = 'libro',
  revista = 'revista',
  web = 'web',
  otro = 'otro',
}


export class AcademicReference {
  public apa_reference: string | null = null;
  public tipo_contenido: string | null = null;
  public titulo_principal: string | null = null;
  public autores: string[] = [];
  public anho: number | null = null;
  public editorial: string | null = null;
  public enlace_doi: string | null = null;
  public isbn: string | null = null;
  public tipo_contenido_secundario: string | null = null;
  public titulo_secundario: string | null = null;
  public edicion: string | null = null;
  public editores: string[] = [];
  public paginas: string | null = null;
  public volumen_periodico: string | null = null;
  public numero_periodico: string | null = null;
  public enlace_red: string | null = null;

  constructor (obj: any = {
    apa_reference: null,
    tipo_contenido: null,
    titulo_principal: null,
    autores: [],
    anho: null,
    editorial: null,
    enlace_doi: null,
    isbn: null,
    tipo_contenido_secundario: null,
    titulo_secundario: null,
    edicion: null,
    editores: [],
    paginas: null,
    volumen_periodico: null,
    numero_periodico: null,
    enlace_red: null,
  }) {
    this.apa_reference = obj.apa_reference;
    this.tipo_contenido = obj.tipo_contenido;
    this.titulo_principal = obj.titulo_principal;
    this.autores = obj.autores;
    this.anho = obj.anho;
    this.editorial = obj.editorial;
    this.enlace_doi = obj.enlace_doi;
    this.isbn = obj.isbn;
    this.tipo_contenido_secundario = obj.tipo_contenido_secundario;
    this.titulo_secundario = obj.titulo_secundario;
    this.edicion = obj.edicion;
    this.editores = obj.editores;
    this.paginas = obj.paginas;
    this.volumen_periodico = obj.volumen_periodico;
    this.numero_periodico = obj.numero_periodico;
    this.enlace_red = obj.enlace_red;
  }

  getApaReference ( ): string {
    if (this.apa_reference) return this.apa_reference;
    return this.buildApaReference();
  }

  buildApaReference ( ): string {
    switch (this.tipo_contenido) {
      case TipoContenidoEnum.libro:
        return this.buildApaReferenceLibro();
      case TipoContenidoEnum.revista:
        return this.buildApaReferenceRevista();
      case TipoContenidoEnum.web:
        return this.buildApaReferenceWeb();
      case TipoContenidoEnum.otro:
        return this.buildApaSimpleReference();
      default:
        return '';
    }
  }

  buildApaReferenceLibro ( ): string {
    let reference: string = '';

    if (this.esAutorable()) {
      if (this.autores.length) {
        reference += this.autores.join(' & ') + '. ';
      }
    }

    if (this.anho) reference += '(' + this.anho + '). ';

    if (this.titulo_secundario) reference += this.titulo_secundario + '. ';

    if (
      this.titulo_secundario &&
      this.titulo_principal
    ) {
      reference += 'In ';
    }

    if (this.editores.length && this.editores.length > 0) {
      if (this.editores.length === 1) reference += this.editores[0] + ' (Ed.), ';
      else {
        reference += (
          this.editores.slice(0, -1).join(', ') +
          ', & ' +
          this.editores.slice(-1) +
          ' (Eds.), '
        );
      }
    }

    if (this.titulo_principal) reference += this.titulo_principal + '. ';

    if (this.edicion) reference += '(' + this.getEdicionEtiqueta() + ' ed.). ';

    if (this.paginas) reference += '(pp. ' + this.paginas + '). ';

    if (this.editorial) reference += this.editorial + '. ';

    if (this.isbn) reference += 'ISBN: ' + this.isbn + '. ';

    if (this.enlace_doi) reference += 'DOI: ' + this.enlace_doi + '. ';

    return reference;
  }

  buildApaReferenceRevista ( ): string {
    let reference: string = '';

    if (this.autores.length) {
      reference += this.autores.join(' & ') + '. ';
    }

    if (this.titulo_secundario) reference += this.titulo_secundario + '. ';

    if (this.titulo_principal) reference += this.titulo_principal + ', ';

    if (this.volumen_periodico) reference += this.volumen_periodico;

    if (this.numero_periodico) {
      reference += '(' + this.numero_periodico + ')';
    }

    if (this.volumen_periodico || this.numero_periodico) reference += ', ';

    if (this.paginas) reference += this.paginas + '. ';

    if (this.enlace_doi) reference += 'DOI: ' + this.enlace_doi + '. ';

    if (this.isbn) reference += 'ISSN: ' + this.isbn + '. ';

    return reference;
  }

  buildApaReferenceWeb ( ): string {
    let reference: string = '';

    if (this.autores.length) {
      reference += this.autores.join(' & ') + '. ';
    }

    if (this.anho) reference += '(' + this.anho + '). ';

    if (this.titulo_principal) reference += this.titulo_principal + '. ';

    if (this.titulo_secundario) reference += this.titulo_secundario + '. ';

    if (this.enlace_red) reference += 'Recuperado de ' + this.enlace_red + '. ';

    return reference;
  }

  buildApaSimpleReference ( ): string {
    let reference: string = '';

    if (this.titulo_principal) reference += this.titulo_principal + '. ';

    if (this.titulo_secundario) reference += this.titulo_secundario + '. ';

    if (this.tipo_contenido_secundario)
      reference += this.tipo_contenido_secundario + '. ';

    if (this.enlace_red) reference += 'Recuperado de ' + this.enlace_red + '. ';

    return reference;
  }

  esAutorable ( ) {
    return (
      this.tipo_contenido === TipoContenidoEnum.libro ||
      this.tipo_contenido === TipoContenidoEnum.revista ||
      this.tipo_contenido === TipoContenidoEnum.web ||
      false
    )
  }

  esVoluminable ( ) {
    return this.tipo_contenido === TipoContenidoEnum.revista;
  }

  esAnuable ( ) {
    return (
      this.tipo_contenido === TipoContenidoEnum.libro ||
      this.tipo_contenido === TipoContenidoEnum.web ||
      false
    );
  }

  esEdicionable ( ) {
    return this.tipo_contenido === TipoContenidoEnum.libro;
  }

  esEditoriable ( ) {
    return this.tipo_contenido === TipoContenidoEnum.libro;
  }

  esISBNable ( ) {
    return (
      this.tipo_contenido === TipoContenidoEnum.libro ||
      this.tipo_contenido === TipoContenidoEnum.revista ||
      false
    );
  }

  esNumerable ( ) {
    return this.tipo_contenido === TipoContenidoEnum.revista;
  }

  esPaginable ( ) {
    return (
      this.tipo_contenido === TipoContenidoEnum.libro ||
      this.tipo_contenido === TipoContenidoEnum.revista ||
      false
    );
  }

  esDOIable ( ) {
    return (
      this.tipo_contenido === TipoContenidoEnum.libro ||
      this.tipo_contenido === TipoContenidoEnum.revista ||
      false
    );
  }

  esEnlaceable ( ) {
    return (
      this.tipo_contenido === TipoContenidoEnum.web ||
      this.tipo_contenido === TipoContenidoEnum.otro ||
      false
    );
  }

  esTipoContenidoSecundarioable ( ) {
    return this.tipo_contenido === TipoContenidoEnum.otro;
  }

  getTipoContenidoEtiqueta (tipo_contenido: string = ''): string {
    if (tipo_contenido) {
      return (
        tipo_contenido.charAt(0).toUpperCase() +
        tipo_contenido.slice(1)
      );
    }

    if (this.tipo_contenido) {
      return (
        this.tipo_contenido.charAt(0).toUpperCase() +
        this.tipo_contenido.slice(1)
      );
    }

    return '';
  }
  
  getEdicionEtiqueta ( ): string {
    if (this.edicion) {
      switch (this.edicion.toString()) {
        case '0':
          return '';
        case '1':
        case '3':
          return this.edicion + 'ra';
        case '2':
          return this.edicion + 'da';
        case '4':
        case '5':
        case '6':
          return this.edicion + 'ta';
        case '7':
        case '10':
          return this.edicion + 'ma';
        case '9':
          return this.edicion + 'na';
        default:
          return this.edicion + 'va';
      }
    }
    return '';
  }

  getAutoresEtiqueta ( ): string {
    if (this.autores.length) {
      return this.autores.join('; ');
    }
    return '';
  }

  setAutores ($event: any) {
    const value: string = $event.target.value;
    this.autores = value
      .toString()
      .split(';')
      .map((autor: string) => autor.trim())
      .filter((autor: string) => autor.length > 0);
    ;
  }

  getEditoresEtiqueta ( ): string {
    if (this.editores.length) {
      return this.editores.join('; ');
    }
    return '';
  }

  setEditores ($event: any) {
    const value: string = $event.target.value;
    this.editores = value
      .toString()
      .split(';')
      .map((editor: string) => editor.trim())
      .filter((editor: string) => editor.length > 0);
    ;
  }

  public validarModelo(): boolean {
    switch (this.tipo_contenido) {
      case TipoContenidoEnum.libro:
        return this.validarModeloLibro();
      case TipoContenidoEnum.revista:
        return this.validarModeloRevista();
      case TipoContenidoEnum.web:
        return this.validarModeloLWeb();
      case TipoContenidoEnum.otro:
        return this.validarModeloLSimple();
      default:
        return false;
    }
  }

  private validarModeloLibro (): boolean {
    if (!this.titulo_principal) return false;

    if (!this.autores.length) return false;

    if (!this.anho) return false;

    if (!this.editorial) return false;

    if (!this.isbn) return false;

    if (!this.titulo_secundario) return false;

    return true;
  }

  private validarModeloRevista(): boolean {
    if (!this.titulo_principal) return false;

    if (!this.autores.length) return false;

    if (!this.anho) return false;

    if (!this.numero_periodico) return false;

    if (!this.volumen_periodico) return false;

    if (!this.isbn && !this.enlace_doi) return false;

    if (!this.titulo_secundario) return false;

    return true;
  }

  private validarModeloLWeb(): boolean {
    if (!this.titulo_principal) return false;

    if (!this.autores.length) return false;

    if (!this.enlace_red) return false;

    return true;
  }
  private validarModeloLSimple(): boolean {
    if (!this.titulo_principal) return false;

    if (!this.titulo_secundario) return false;

    if (!this.tipo_contenido_secundario) return false;

    if (!this.enlace_red) return false;

    return true;
  }

}