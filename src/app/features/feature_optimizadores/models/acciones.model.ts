export class Acciones {
    public otorgar_permiso_editar_problema: boolean = false;
    public actualizar_problema: boolean = false;
    public crear_instancia_problema: boolean = false;

    public otorgar_permiso_editar_algoritmo: boolean = false;
    public actualizar_algoritmo: boolean = false;
    public crear_implementacion_algoritmo: boolean = false;

    public otorgar_permiso_editar_instancia: boolean = false;
    public actualizar_instancia: boolean = false;
    public ejecutar_comando_instancia: boolean = false;
    public publicar_argumentos_instancia: boolean = false;
    public crear_solucion_instancia: boolean = false;

    public otorgar_permiso_editar_implementacion: boolean = false;
    public actualizar_implementacion: boolean = false;
    public ejecutar_comando_implementacion: boolean = false;
    public publicar_argumentos_implementacion: boolean = false;
    public crear_solucion_implementacion: boolean = false;

    public otorgar_permiso_editar_solucion: boolean = false;
    public actualizar_solucion: boolean = false;
    public ejecutar_comando_solucion: boolean = false;
    public ejecutar_solucion: boolean = false;
    
    constructor ( ) { }

    fill_obj (obj: string[] = []) {
        obj.forEach((accion: string) => {
            switch (accion) {
                case "accion_otorgar_permiso_editar_problema":
                    this.otorgar_permiso_editar_problema = true;
                    break;
                case "accion_actualizar_problema":
                    this.actualizar_problema = true;
                    break;
                case "accion_crear_instancia_problema":
                    this.crear_instancia_problema = true;
                    break;
                case "accion_otorgar_permiso_editar_algoritmo":
                    this.otorgar_permiso_editar_algoritmo = true;
                    break;
                case "accion_actualizar_algoritmo":
                    this.actualizar_algoritmo = true;
                    break;
                case "accion_crear_implementacion_algoritmo":
                    this.crear_implementacion_algoritmo = true;
                    break;
                case "accion_otorgar_permiso_editar_instancia":
                    this.otorgar_permiso_editar_instancia = true;
                    break;
                case "accion_actualizar_instancia":
                    this.actualizar_instancia = true;
                    break;
                case "accion_ejecutar_comando_instancia":
                    this.ejecutar_comando_instancia = true;
                    break;
                case "accion_publicar_argumentos_instancia":
                    this.publicar_argumentos_instancia = true;
                    break;
                case "accion_crear_solucion_instancia":
                    this.crear_solucion_instancia = true;
                    break;
                case "accion_otorgar_permiso_editar_implementacion":
                    this.otorgar_permiso_editar_implementacion = true;
                    break;
                case "accion_actualizar_implementacion":
                    this.actualizar_implementacion = true;
                    break;
                case "accion_ejecutar_comando_implementacion":
                    this.ejecutar_comando_implementacion = true;
                    break;
                case "accion_publicar_argumentos_implementacion":
                    this.publicar_argumentos_implementacion = true;
                    break;
                case "accion_crear_solucion_implementacion":
                    this.crear_solucion_implementacion = true;
                    break;
                case "accion_otorgar_permiso_editar_solucion":
                    this.otorgar_permiso_editar_solucion = true;
                    break;
                case "accion_actualizar_solucion":
                    this.actualizar_solucion = true;
                    break;
                case "accion_ejecutar_comando_solucion":
                    this.ejecutar_comando_solucion = true;
                    break;
                case "accion_ejecutar_solucion":
                    this.ejecutar_solucion = true;
                    break;
                default:
                    break;
            }
        });
    }
}