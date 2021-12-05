import { LoginService } from './../../../../../core/services/login.service';
import { MyInformation } from './../../../../../shared/models/my-information';
import { CotizacionService } from './../../../../../core/services/cotizacion.service';
import { CarritoItem } from './../../../../../shared/models/store/carrito-item';
import { CarritoService } from './../../../../../core/services/store/carrito.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/shared/models/producto';


@Component({
  selector: 'app-cars-producto',
  templateUrl: './cars-producto.component.html',
  styleUrls: ['./cars-producto.component.css']
})
export class CarsProductoComponent implements OnInit {
 
  messageError:string;
  download:Blob;
  imageBlobUrl: string | null = null;
  pdfSrc: string;
  productosCarrito: CarritoItem[] = [];  
  totalCarrito:number = 0;
  usuarioSesion:MyInformation= new MyInformation();
  conteo:number;

  constructor(private rutaActiva: ActivatedRoute,
              private service: ProductoService, 
              private router: Router,
              private carritoService:CarritoService,
              private cotizacionService:CotizacionService,
              private loginService:LoginService) { }

  ngOnInit(): void {
    this.productosCarrito = this.carritoService.obtener();
    this.totalCarrito = this.carritoService.obtenerTotal();
    this.usuarioSesion =  JSON.parse(sessionStorage.getItem('user-info'));// (sessionStorage.getItem('user-info') as any) ;
    this.conteo = this.carritoService.obtenerConteo();
  }

  cerraModal() {
    $("#imagemodal").hide();
  }

  quitarCarrito(id:number){
   this.carritoService.quitar(id);
   this.productosCarrito = this.carritoService.obtener();
   this.totalCarrito = this.carritoService.obtenerTotal();
   this.conteo = this.carritoService.obtenerConteo();
  }

  quitarTodoByCotizacion(){
    this.carritoService.quitarAll();
    this.totalCarrito = 0.0;
    this.productosCarrito = [];
    this.conteo = this.carritoService.obtenerConteo();
  }

  crearPedido(){

    this.productosCarrito = this.carritoService.obtener();

    if( this.productosCarrito.length>0){
      this.messageError="";
      console.log(this.productosCarrito);
      var prod = (this.productosCarrito as any)
      this.cotizacionService.crearCotizacion(prod).subscribe(data=>{

        this.cotizacionService.generarReporte(data.id).subscribe(data1=>{
          
          this.cotizacionService.realizarPedido(data).subscribe(data1=>{
            this.messageError="El pedido se realizó con exito.";
          
          });

        });
        this.quitarTodoByCotizacion();



      });
    }else{
      this.messageError="No existe ningun producto para la cotización.";
    }

  }

  cotizar(){
    console.log("entrooo");
    this.productosCarrito = this.carritoService.obtener();

    if( this.productosCarrito.length>0){
      this.messageError="";
      console.log(this.productosCarrito);
      var prod = (this.productosCarrito as any)
      this.cotizacionService.crearCotizacion(prod).subscribe(data=>{
        this.cotizacionService.generarReporte(data.id).subscribe(data1=>{
          let reader = new FileReader();
            reader.onload = (e: any) => {
              this.pdfSrc = e.target.result;
              console.log(this.pdfSrc);
              $("#imagemodal").show();    
            }
            this.download = data1;
            reader.readAsArrayBuffer(data1);
        });
        this.quitarTodoByCotizacion();
      });
    }else{
      this.messageError="No existe ningun producto para la cotización.";
    }
  }

  
imprimirReporte(){
  var blob = new Blob([this.download], {type: 'application/pdf'});
    const blobUrl = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      iframe.contentWindow.print();

}
  guardarReporte(){
    let url = window.URL.createObjectURL(this.download);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'Cotizacion.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
 

}
