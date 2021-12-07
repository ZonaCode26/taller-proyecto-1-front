import { LoginService } from './../../../../../core/services/login.service';
import { CarritoService } from './../../../../../core/services/store/carrito.service';
import { MyInformation } from './../../../../../shared/models/my-information';
import { FilterCotizacion } from './../../../../../shared/models/request/filter-cotizacion';
import { CotizacionService } from './../../../../../core/services/cotizacion.service';
import { Subject } from 'rxjs';
import { Cotizacion } from './../../../../../shared/models/cotizacion';
import { Settings2 } from './../../../../../shared/models/settings';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-cotizaciones',
  templateUrl: './historial-cotizaciones.component.html',
  styleUrls: ['./historial-cotizaciones.component.css']
})
export class HistorialCotizacionesComponent implements OnInit {

  messageError:string;
  pdfSrc: string;
  download:Blob;

  filter:FilterCotizacion;
  dtOptions: Settings2 = {};
  cotizaciones: Cotizacion[] = [];  
  dtTrigger: Subject<any> = new Subject<any>();
  columnDefs?: DataTables.ColumnDefsSettings[];
  columns?: DataTables.ColumnSettings[];
  datNow:Date = new Date();

  conteo:number;
  usuarioSesion:MyInformation= new MyInformation();

  constructor(private service: CotizacionService,
              private carritoService:CarritoService,
              private loginService:LoginService) {
   }

  ngOnInit(): void {
    this.usuarioSesion =  JSON.parse(sessionStorage.getItem('user-info'));// (sessionStorage.getItem('user-info') as any) ;
    

    if(this.filter==null){
      this.filter= new FilterCotizacion();
      this.filter.estado="TODOS"
    }
    this.service.listarDataTable(this.filter).subscribe(data=>{
      this.cotizaciones = (data as any).data;
      this.dtTrigger.next();
    });

    this.columnDefs =[
      {targets:0,width:"40px"},
      {targets:1,width:"150px"},
      {targets:2,width:"150px"},
      {targets:3,width:"30px"},
      {targets:4,width:"100px"},
      {targets:5,width:"150px"},
      {targets:6,width:"150px"}
    ];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [5, 10, 25],
      processing: true,
      scrollX: true,
      columnDefs:this.columnDefs  ,
      order:    [[ 1, "desc" ]],
      ordering:true
    };
    this.conteo = this.carritoService.obtenerConteo();

  }

  reload():void{
    this.service.listarDataTable(this.filter).subscribe(data=>{
      this.cotizaciones = (data as any).data;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  verDocumento(obj:Cotizacion){


    this.service.consultarReporte(obj.id).subscribe(data1=>{
      let reader = new FileReader();
        reader.onload = (e: any) => {
          this.pdfSrc = e.target.result;
          console.log(this.pdfSrc);
          $("#imagemodal").show();

        }
        this.download = data1;
        reader.readAsArrayBuffer(data1);
   
      //generar pdf

    });


  }

  doPedido(obj:Cotizacion){
    this.service.realizarPedido(obj).subscribe(data=>{
      this.ngOnDestroy();
      this.reload();
      this.messageError = "Se realizó correctamente el pedido de los productos.";
      
    });
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
  
  cerraModal() {

    $("#imagemodal").hide();
  }


  cerrarSesion(){
    this.loginService.cerrarSesion();
  }

  validarFecha(obj:Cotizacion){
  
    this.datNow = new Date();

    var da = new Date(obj.fechaRegistro);


    da.setDate( da.getDate() + 15 );
    
    if(da <= this.datNow){
      console.log("cumple");
      return true;
    }
    console.log("no cumple");
    return false;
    
  }
 
  
  formateaValor(valor) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  }

}
