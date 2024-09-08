export class Acciones {
    public otorgrar_permiso_editar_problema: boolean = false;
    public actualizar_problema: boolean = false;
    public crear_instancia_problema: boolean = false;
    
    constructor ( ) { }

    fill_obj (obj: string[] = []) {
        obj.forEach((accion: string) => {
            switch (accion) {
                case "accion_otorgar_permiso_editar_problema":
                    this.otorgrar_permiso_editar_problema = true;
                    break;
                case "accion_actualizar_problema":
                    this.actualizar_problema = true;
                    break;
                case "accion_crear_instancia_problema":
                    this.crear_instancia_problema = true;
                    break;
                default:
                    break;
            }
        });
    }
}