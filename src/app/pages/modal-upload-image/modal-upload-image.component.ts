import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/services/modal-upload.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import swal from 'sweetalert';
import { User } from 'src/app/models/user';
import { ImagePayload } from '../../models/image';

@Component({
  selector: 'app-modal-upload-image',
  templateUrl: './modal-upload-image.component.html',
  styles: []
})
export class ModalUploadImageComponent implements OnInit {


  fake = 'fake';
  imagenSubir: File;
  imagenTemp: string = 'assets/images/no-image.png';

  constructor(public subirArchivoService: UploadFileService,
    public modalUploadService: ModalUploadService) {
}

ngOnInit() {
}

cerrarModal() {
this.imagenTemp = null;
this.imagenSubir = null;
this.modalUploadService.hiddenModal();
}


subirImagen() {

  let image = new ImagePayload();
  image._id = this.modalUploadService.id;
  image.type = this.modalUploadService.tipo;
  image.file = this.imagenSubir;

  
  console.log(image);

this.subirArchivoService.uploadFileService(image)
.then( resp => {

  this.modalUploadService.notificacion.emit( resp );
  this.cerrarModal();

})
.catch( err => {

  //let jsonObject = err.json() as Object;
  // let fooInstance = plainToClass(Models.Foo, jsonObject);
  // return fooInstance;

  console.log( 'Error en la carga... ', err);
 //swal('Error', err, 'error');

});

}



seleccionImage(archivo: File) {

if (!archivo) {
this.imagenSubir = null;
}

if (archivo.type.indexOf('image') < 0) {
swal('Sólo puede seleccionar imágenes', 'El archivo seleccionado no es una imagen', 'error');
this.imagenSubir = null;
return;
}

this.imagenSubir = archivo;

const reader = new FileReader();
const urlImagenTemp = reader.readAsDataURL(archivo);

reader.onloadend = () => {
this.imagenTemp = reader.result.toString();
};

}



}
