import { LoginService } from './../../../../../core/services/login.service';
import { ProductoService } from './../../../../../core/services/producto.service';
import { Producto } from './../../../../../shared/models/producto';
import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Settings2 } from 'src/app/shared/models/settings';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.css']
})
export class ListadoProductoComponent implements OnDestroy,OnInit {
  imageFile: {link: string, file: any, name: string,id:any,newid:any};

  public formDisabled = true;
  /*
  authorForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(),//new FormControl({value: '', disabled: this.formDisabled}),
    apellido: new FormControl(''),
    edad: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    foto: new FormControl(''),
  });*/


  dtOptions: Settings2 = {};
  products: Producto[] = [];  
  dtTrigger: Subject<any> = new Subject<any>();
  columnDefs?: DataTables.ColumnDefsSettings[];
  columns?: DataTables.ColumnSettings[];

  constructor(private service: ProductoService,
    private loginService:LoginService) { }

  ngOnInit(): void {
    /*this.service.listarDataTable().subscribe(data=>{
      this.products = (data as any).data;
      this.dtTrigger.next();
    });*/

    this.columnDefs =[
      {targets:0,width:"40px",orderable:false},
      {targets:1,width:"150px",orderable:false},
      {targets:2,width:"150px",orderable:false},
      {targets:3,width:"30px",orderable:false},
      {targets:4,width:"100px",orderable:false},
      //{targets:5,width:"200px",orderable:false},
      {targets:5,width:"150px",orderable:false}
    ];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      lengthMenu : [2, 10, 25],
      processing: true,
      scrollX: true,
      columnDefs:this.columnDefs      
    };

    $('#datatableID tbody').on('click', 'button.editar', function () {            
       //$("#imagemodal").modal("show");
    });

  }

  reload():void{
    this.service.listarDataTable().subscribe(data=>{
      this.products = (data as any).data;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  hide(){
    $("#imagemodal").hide(); 
  }

  imagesPreview(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (_event: any) => {
            this.imageFile = {
                link: _event.target.result,
                file: event.srcElement.files[0],
                name: event.srcElement.files[0].name,
                id: this.imageFile.id ,
                newid: null
            };
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}


actualizarDatos(data:Producto){

  const formData = new FormData();
  formData.append('file', this.imageFile.file);
  formData.append('idEntity',''+data.id);
  formData.append('typeEntity', 'author');
  formData.append('idFile', this.imageFile.id);

 // this.fileService.actualizarRecurso(formData,this.imageFile.id).subscribe(data => {});
  

}

  onSubmit(): void {

    Swal.fire({  
      title: '¿Estas seguro de actualizar?',  
      text: 'Sí actualizas no podras revertir los cambios!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Si, Actualizar!',  
      cancelButtonText: 'No, Cancelar'  
    }).then((result) => {  
      if (result.value) {  

        const entity = new Producto();
        //entity.id = this.authorForm.value.id;
        //entity.nombre = this.authorForm.value.nombre;
        /*entity.apellido = this.authorForm.value.apellido;
        entity.edad = this.authorForm.value.edad;
        entity.fechaNacimiento = this.authorForm.value.fechaNacimiento;
      */
        this.service.modificar(entity).subscribe(data => {
      /*
          const formData = new FormData();
          formData.append('file', this.imageFile.file);
          formData.append('idEntity',''+entity.id);
          formData.append('typeEntity', 'author');
          formData.append('idFile', this.imageFile.id);
          if(this.imageFile.id != null && this.imageFile.newid == null ){
            this.fileService.actualizarRecurso(formData,this.imageFile.id).subscribe(data => {});
          }else if(this.imageFile.id == null && this.imageFile.newid == null ){
            this.fileService.registrarRecurso(formData).subscribe(data => {});
          }
          */
          
    //      this.ngOnDestroy();
  //        this.reload();
  //        this.dtTrigger.unsubscribe;
  //        this.reload();
          Swal.fire(  
            'Actualizado!',  
            'Se actualizo correctamente.',  
            'success'  
          )  
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        /*Swal.fire(  
          'Cancelado',  
          'El registro está seguro!',  
          'error'  
        )*/  
      }  
    });

  }


  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}