import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {


  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICES + '/UploadFile/download/';
    const urlDefecto = URL_SERVICES  + '/UploadFile/download/default';

    if (img == 'xx') {
    return urlDefecto;
    }

    if ( img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {

      case 'users':
        url += 'users/' + img;
      break;

      case 'students':
          url += 'students/' + img;
        break;

      case 'teachers':
          url += 'teachers/' + img;
        break;

      default:
        console.log('tipo de imagen no existe');
        url += urlDefecto;
        break;

    }

    return url;
  }

}
