enum PermisosEnum {
    explorador = 'explorador',
    moderador = 'moderador',
    verificado = 'verificado',
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

}

export class PermisoTipado extends Permisos {

    public constructor (
        obj: any = {
            nombre: null,
            tipo_valido: null,
        }
    ) {
        if (obj.nombre !== null && 
            PermisoTipado.get_permiso_llave(obj.nombre) == obj.tipo_valido
        ) {
            super(obj);
        } else {
            throw new Error('El permiso no es del tipo correcto');
        }
    }
}

export class PermisoExplorador extends PermisoTipado {
    public constructor (
        obj: any = {
            nombre: null,
        }
    ) {
        super({nombre: obj.nombre, tipo_valido: PermisosEnum.explorador});
    }
}

export class PermisoModerador extends PermisoTipado {
    public constructor (
        obj: any = {
            nombre: null,
        }
    ) {
        super({nombre: obj.nombre, tipo_valido: PermisosEnum.moderador});
    }
}

export class PermisoVerificado extends PermisoTipado {
    public constructor (
        obj: any = {
            nombre: null,
        }
    ) {
        super({nombre: obj.nombre, tipo_valido: PermisosEnum.verificado});
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
