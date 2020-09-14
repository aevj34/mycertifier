import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../config/config';
import swal from 'sweetalert';
import { ImagePayload } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  
  uploadFileService(imagePayload: ImagePayload) {

    return new Promise( (resolve, reject) => {
  
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
  
      formData.append("_id", imagePayload._id.toString());
      formData.append("type", imagePayload.type.toString());
      formData.append('FileName', imagePayload.file, imagePayload.file.name);
  
      xhr.onreadystatechange = function() {
  
        if (xhr.readyState === 4) {
  
            if (xhr.status === 200) {
              swal(
                'Archivo subido',
                'El archivo ha sido subido satisfactoriamente!',
                'success'
              )

              resolve('ok');
            } else {
              reject(xhr.response);
          }
        }
      };
  
        const url = URL_SERVICES + '/UploadFile/upload';
        xhr.open('POST', url, true);
        xhr.send(formData);
    });
  
    }


    // cambiarImagen(archivo: File, id: string) {

    //   this.subirArchivoService.subirAchivo(archivo, 'usuarios', id)
    //           .then((resp: any) => {

    //             this.usuario.img = resp.usuario.img;
    //             swal('Imagen actualizada', this.usuario.nombre, 'success');
    //             this.guardarStorage(id, this.token, this.usuario, this.menu);

    //           })
    //           .catch(resp => {
    //             console.log(resp);
    //           });

    // }

}
