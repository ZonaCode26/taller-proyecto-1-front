import { DetalleConsulta } from './detalle-consulta';
import { Usuario } from './usuario';
export class Cotizacion {
    id:number;
    codCotizacion:string;
    usuario:Usuario;
    ruc:string;
    estado:boolean;
    fechaRegistro:Date;
    detalleConsulta:DetalleConsulta;

    fecha:string;
    monto:string;
    totalBrutoCotizacion:number;




}
