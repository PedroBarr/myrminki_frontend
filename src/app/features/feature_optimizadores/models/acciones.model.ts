export class Acciones {

    public crear_problema: boolean = false;
    public crear_algoritmo: boolean = false;
    public crear_instancia: boolean = false;
    public crear_implementacion: boolean = false;
    public crear_solucion: boolean = false;

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

    public revisar_referentes: boolean = false;
    public crear_referentes: boolean = false;
    public actualizar_referentes: boolean = false;
    public eliminar_referentes: boolean = false;
    public reportar_referentes: boolean = false;

    public calificar_problema: boolean = false;
    public calificar_instancia: boolean = false;
    public calificar_algoritmo: boolean = false;
    public calificar_implementacion: boolean = false;
    public calificar_solucion: boolean = false;
    
    constructor ( ) { }

    fill_obj (obj: string[] = []) {
        obj.forEach((accion: string) => {
            switch (accion) {
                case "accion_crear_problema":
                    this.crear_problema = true;
                    break;
                case "accion_crear_algoritmo":
                    this.crear_algoritmo = true;
                    break;
                case "accion_crear_instancia":
                    this.crear_instancia = true;
                    break;
                case "accion_crear_implementacion":
                    this.crear_implementacion = true;
                    break;
                case "accion_crear_solucion":
                    this.crear_solucion = true;
                    break;
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
                case "accion_revisar_referentes":
                    this.revisar_referentes = true;
                    break;
                case "accion_crear_referentes":
                    this.crear_referentes = true;
                    break;
                case "accion_actualizar_referentes":
                    this.actualizar_referentes = true;
                    break;
                case "accion_eliminar_referentes":
                    this.eliminar_referentes = true;
                    break;
                case "accion_reportar_referentes":
                    this.reportar_referentes = true;
                    break;
                case "accion_calificar_problema":
                    this.calificar_problema = true;
                    break;
                case "accion_calificar_instancia":
                    this.calificar_instancia = true;
                    break;
                case "accion_calificar_algoritmo":
                    this.calificar_algoritmo = true;
                    break;
                case "accion_calificar_implementacion":
                    this.calificar_implementacion = true;
                    break;
                case "accion_calificar_solucion":
                    this.calificar_solucion = true;
                    break;
                default:
                    break;
            }
        });
    }

    public esVacio ( ) {
        return (
            !this.crear_problema &&
            !this.crear_algoritmo &&
            !this.crear_instancia &&
            !this.crear_implementacion &&
            !this.crear_solucion &&
            !this.otorgar_permiso_editar_problema &&
            !this.actualizar_problema &&
            !this.crear_instancia_problema &&
            !this.otorgar_permiso_editar_algoritmo &&
            !this.actualizar_algoritmo &&
            !this.crear_implementacion_algoritmo &&
            !this.otorgar_permiso_editar_instancia &&
            !this.actualizar_instancia &&
            !this.ejecutar_comando_instancia &&
            !this.publicar_argumentos_instancia &&
            !this.crear_solucion_instancia &&
            !this.otorgar_permiso_editar_implementacion &&
            !this.actualizar_implementacion &&
            !this.ejecutar_comando_implementacion &&
            !this.publicar_argumentos_implementacion &&
            !this.crear_solucion_implementacion &&
            !this.otorgar_permiso_editar_solucion &&
            !this.actualizar_solucion &&
            !this.ejecutar_comando_solucion &&
            !this.ejecutar_solucion &&
            !this.revisar_referentes &&
            !this.crear_referentes &&
            !this.actualizar_referentes &&
            !this.eliminar_referentes &&
            !this.reportar_referentes &&
            !this.calificar_problema &&
            !this.calificar_instancia &&
            !this.calificar_algoritmo &&
            !this.calificar_implementacion &&
            !this.calificar_solucion &&
            true
        );
    }
}