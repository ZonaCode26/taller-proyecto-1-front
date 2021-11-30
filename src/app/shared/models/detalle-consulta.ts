import { Producto } from './producto';
export class DetalleConsulta {
    id:number;
    producto:Producto;
    cantidad:number;
    precioUnidad:number;
    precioTotal:number;
    fechaRegistro:Date;
}
