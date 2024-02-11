export enum ACERCA_DE_TIPOS_DIAPOSITIVA {
  TIPO_PANCARTA = "pancarta",
  TIPO_DESCRIPTOR = "descriptor",
  TIPO_PAR_DESCRIPTORES = "par_descriptor"
}

type TIPOS_DIAPOSITIVA = `${ACERCA_DE_TIPOS_DIAPOSITIVA}`;

export class AboutSlide {
  public titulo: string | null = null;
  public titulos_descriptores: string[] | null = null;
  public subtitulo: string | null = null;
  public subtitulos_descriptores: string[] | null = null;
  public textos: string[] | null = null;
  public textos_descriptores: string[][] | null = null;
  public enlace: string | null = null;
  public enlaces_descriptores: string[] | null = null;
  public imagen_pancarta: string | null = null;
  public imagen_pancarta_texto_alternativo: string | null = null;
  public imagen_descriptor: string | null = null;
  public imagen_descriptor_texto_alternativo: string | null = null;
  public imagenes_descriptores: string[] | null = null;
  public imagenes_descriptores_textos_alternativos: string[] | null = null;

  constructor (
    public tipoSlide: TIPOS_DIAPOSITIVA,
  ) { }

  static parseSlides (object: any): AboutSlide[] {
    return [];
  }
}