export enum TipoContenidoEnum {
  libro = 'libro',
  revista = 'revista',
  web = 'web',
  otro = 'otro',
}


export class AcademicReference {
  public refrt_id: string | null = null;
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
  public nota: string | null = null;

  constructor (obj: any = {
    refrt_id: null,
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
    nota: null,
  }) {
    this.refrt_id = obj.refrt_id;
    this.apa_reference = obj.apa_reference;

    if (typeof obj.tipo_contenido === 'string') {
      if (obj.tipo_contenido.toLowerCase() in TipoContenidoEnum) {
        this.tipo_contenido = obj.tipo_contenido.toLowerCase();
      } else if (obj.tipo_contenido.toLowerCase() == 'sitio web') {
        this.tipo_contenido = 'web';
      } else {
        this.tipo_contenido = 'otro';
      }
    } else {
      this.tipo_contenido = 'otro';
    }
    
    this.titulo_principal = obj.titulo_principal;
    this.autores = obj.autores;
    this.anho = obj.anho;
    this.editorial = obj.editorial;
    this.enlace_doi = obj.enlace_doi;
    this.isbn = obj.isbn;
    this.tipo_contenido_secundario = obj.tipo_contenido_secundario;
    this.titulo_secundario = obj.titulo_secundario;

    // eliminar letras de edicion
    if (obj.edicion) {
      this.edicion = obj.edicion.replace(/[a-zA-Z]/g, '');
    }
    
    this.editores = obj.editores;
    this.paginas = obj.paginas;
    this.volumen_periodico = obj.volumen_periodico;
    this.numero_periodico = obj.numero_periodico;
    this.enlace_red = obj.enlace_red;

    this.nota = obj.nota;
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

    if (this.nota)
      reference += this.nota + '. ';

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

  esNotable ( ) {
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

  getTipoContenidoSecundarioEtiqueta ( ): string {
    if (this.tipo_contenido_secundario) {
      return (
        this.tipo_contenido_secundario.charAt(0).toUpperCase() +
        this.tipo_contenido_secundario.slice(1)
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

  setAutores (event: any) {
    const value: string = event.target.value;
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

  setEditores (event: any) {
    const value: string = event.target.value;

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

    if (!this.nota) return false;

    if (!this.enlace_red) return false;

    return true;
  }

  public toJSON ( ): any {
    const obj: any = {};

    if (this.refrt_id) obj.id = this.refrt_id;

    obj.cita_apa = this.getApaReference();

    obj.principal_cita = {};
    obj.secundario_cita = {};
    obj.complemento_cita = {};

    if (this.tipo_contenido) {
      obj.principal_cita.tipo = (
        this.tipo_contenido.charAt(0).toUpperCase() +
        this.tipo_contenido.slice(1)
      );
    } else {
      obj.principal_cita.tipo = '';
    }

    switch (this.tipo_contenido) {
      case TipoContenidoEnum.libro:
        obj.principal_cita.titulo = this.titulo_principal;
        obj.principal_cita.anho = this.anho;
        obj.principal_cita.isbn = this.isbn;
        obj.principal_cita.autores = this.autores;

        obj.secundario_cita.tipo = 'capítulo';
        obj.secundario_cita.titulo = this.titulo_secundario;
        obj.secundario_cita.editorial = this.editorial;
        obj.secundario_cita.edicion = this.getEdicionEtiqueta();

        obj.complemento_cita.paginas = this.paginas;
        obj.complemento_cita.editores = this.editores;
        obj.complemento_cita.doi = this.enlace_doi;

        break;
      case TipoContenidoEnum.revista:
        obj.principal_cita.titulo = this.titulo_principal;
        obj.principal_cita.isbn = this.isbn;
        obj.principal_cita.autores = this.autores;

        obj.secundario_cita.tipo = 'artículo';
        obj.secundario_cita.titulo = this.titulo_secundario;
        obj.secundario_cita.volumen = this.volumen_periodico;
        obj.secundario_cita.numero = this.numero_periodico;

        obj.complemento_cita.paginas = this.paginas;
        obj.complemento_cita.doi = this.enlace_doi;

        break;
      case TipoContenidoEnum.web:
        obj.principal_cita.titulo = this.titulo_principal;
        obj.principal_cita.anho = this.anho;
        obj.principal_cita.autores = this.autores;

        obj.secundario_cita.tipo = 'entrada';
        obj.secundario_cita.titulo = this.titulo_secundario;

        obj.complemento_cita.enlace_red = this.enlace_red;

        break;
      case TipoContenidoEnum.otro:
      default:
        obj.principal_cita.titulo = this.titulo_principal;

        obj.secundario_cita.tipo = 'desconocido';
        obj.secundario_cita.titulo = this.titulo_secundario;

        obj.complemento_cita.nota = this.nota;
        obj.complemento_cita.enlace_red = this.enlace_red;

        break;
    }

    return obj;
  }

  static fromJSON (referente: any): AcademicReference {
    const nuevo_referente: AcademicReference = new AcademicReference();

    nuevo_referente.refrt_id = referente.id;
    nuevo_referente.apa_reference = referente.cita_apa;
      
    const principal: any = referente.principal_cita;
    const secundario: any = referente.secundario_cita;
    const complemento: any = referente.complemento_cita;

    if (typeof principal === 'object') {
      if (principal.tipo)
        nuevo_referente['tipo_contenido'] = principal.tipo.toLowerCase();

      if (principal.titulo)
        nuevo_referente['titulo_principal'] = principal.titulo;

      if (principal.anho)
        nuevo_referente['anho'] = principal.anho;

      if (principal.isbn)
        nuevo_referente['isbn'] = principal.isbn;

      if (principal.autores && principal.autores.length)
        nuevo_referente['autores'] = principal.autores;

    }

    if (typeof secundario === 'object') {
      if (secundario.editorial)
        nuevo_referente['editorial'] = secundario.editorial;

      if (secundario.edicion)
        nuevo_referente['edicion'] = secundario.edicion;

      if (secundario.volumen)
        nuevo_referente['volumen_periodico'] = secundario.volumen;

      if (secundario.numero)
        nuevo_referente['numero_periodico'] = secundario.numero;

      if (secundario.tipo)
        nuevo_referente['tipo_contenido_secundario'] = secundario.tipo;

      if (secundario.titulo)
        nuevo_referente['titulo_secundario'] = secundario.titulo;

    }

    if (typeof complemento === 'object') {
      if (complemento.doi)
        nuevo_referente['enlace_doi'] = complemento.doi;

      if (complemento.enlace_red)
        nuevo_referente['enlace_red'] = complemento.enlace_red;

      if (complemento.paginas)
        nuevo_referente['paginas'] = complemento.paginas;

      if (complemento.editores && complemento.editores.length)
        nuevo_referente['editores'] = complemento.editores;

      if (complemento.nota)
        nuevo_referente['nota'] = complemento.nota;
    }

    return nuevo_referente;
  }

  public toCrudo ( ): string {
    let crudo: string = '';
    
    if (this.tipo_contenido) {
      crudo += this.getTipoContenidoEtiqueta() + ' ';
    }
    
    if (this.titulo_principal) crudo += this.titulo_principal + ' ';
    
    if (this.anho) crudo += this.anho + ' ';

    if (this.edicion) {
      crudo += this.edicion + ' ';
      crudo += this.getEdicionEtiqueta() + ' ';
    }

    if (this.volumen_periodico) crudo += this.volumen_periodico + ' ';

    if (this.numero_periodico) crudo += this.numero_periodico + ' ';

    if (this.paginas) crudo += this.paginas + ' ';

    if (this.tipo_contenido_secundario) {
      crudo += this.getTipoContenidoSecundarioEtiqueta() + ' ';
    }

    if (this.titulo_secundario) crudo += this.titulo_secundario + ' ';

    if (this.autores.length) {
      crudo += this.autores.join(' ') + ' ';
    }

    if (this.editores.length) {
      crudo += this.editores.join(' ') + ' ';
    }

    if (this.editorial) crudo += this.editorial + ' ';

    if (this.enlace_doi) crudo += this.enlace_doi + ' ';

    if (this.isbn) crudo += this.isbn + ' ';

    if (this.enlace_red) crudo += this.enlace_red + ' ';

    if (this.nota) crudo += this.nota + ' ';

    return crudo;
  }

  public static replaceSpecialCharacters (text: string): string {
    return text
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/Á/g, 'A')
      .replace(/É/g, 'E')
      .replace(/Í/g, 'I')
      .replace(/Ó/g, 'O')
      .replace(/Ú/g, 'U')
      .replace(/Ñ/g, 'N')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    ;
  }

}