import { Rol } from './rol';
export class Usuario {
    idUsuario:number;
    ruc:string;
    razonSocial:string;
    enabled:boolean;
    roles:Rol[];

}
