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

  constructor ( ) { }

}