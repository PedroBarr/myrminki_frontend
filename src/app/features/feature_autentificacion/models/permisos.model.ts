export enum PermisosEnum {
    explorador = 'explorador',
    moderador = 'moderador',
    verificado = 'verificado',
}

enum PermisosEnumIconos {
    explorador = 'travel_explore',
    moderador = 'policy',
    verificado = 'workspace_premium',
    // AdminPanelSettingsIcon
}

export class Permisos {
    public nombre: string;

    public constructor (
        obj: any = {
            nombre: null,
        }
    ) {
        this.nombre = obj.nombre;
    }

    public static get_permiso_llave(nombre: string): string {
        return nombre.toLowerCase().replace(' ', '_');
    }

    public get_icono(): string {
        return '';
    }

    public get_nombre(): string {
        return this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
    }

}

export class PermisoTipado extends Permisos {

    private icono: string;

    public constructor (
        obj: any = {
            nombre: null,
            tipo_valido: null,
            icono: '',
        }
    ) {
        if (obj.nombre !== null && 
            PermisoTipado.get_permiso_llave(obj.nombre) == obj.tipo_valido
        ) {
            super(obj);
        } else {
            throw new Error('El permiso no es del tipo correcto');
        }

        this.icono = obj.icono;
    }

    public override get_icono(): string {
        return this.icono;
    }
}

export class PermisoExplorador extends PermisoTipado {
    public constructor (
        obj: any = {
            nombre: null,
        }
    ) {
        super({
            nombre: obj.nombre,
            tipo_valido: PermisosEnum.explorador,
            icono: PermisosEnumIconos.explorador,
        });
    }
}

export class PermisoModerador extends PermisoTipado {
    public constructor (
        obj: any = {
            nombre: null,
        }
    ) {
        super({
            nombre: obj.nombre,
            tipo_valido: PermisosEnum.moderador,
            icono: PermisosEnumIconos.moderador,
        });
    }
}

export class PermisoVerificado extends PermisoTipado {
    public constructor (
        obj: any = {
            nombre: null,
        }
    ) {
        super({
            nombre: obj.nombre,
            tipo_valido: PermisosEnum.verificado,
            icono: PermisosEnumIconos.verificado,
        });
    }
}

export class FactoriaPermisosTipados {

    public static crearPermiso(
        obj: any = {
            nombre: null,
        }
    ): PermisoTipado | null {
        switch (Permisos.get_permiso_llave(obj.nombre)) {
            case PermisosEnum.explorador:
                return new PermisoExplorador(obj);
            case PermisosEnum.moderador:
                return new PermisoModerador(obj);
            case PermisosEnum.verificado:
                return new PermisoVerificado(obj);
            default:
                return null;
        }
    }
}
