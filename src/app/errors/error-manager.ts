
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

export class ErrorManager {

  private static router: Router;

    constructor(public _router: Router) 
    {
      ErrorManager.router = _router;
     }
  
    public static handleError(error, message) {

      console.log(error);

      if (error.status === 500) {
        //swal(error.statusText, 'Hubo un error en el servidor','error');
        return;
      }

      if (error.status === 0) {
        //swal(error.statusText, 'Hubo un error desconocido','error');
        return;
      }

   
      if (error.message) {
        let header = '---';
        if (error.error.header){
          header = error.error.header;
        }

        //swal(header, error.error.message,'error');
        Swal.fire(error.error.header, error.error.message, 'error');

        if (error.error.redirect){
          console.log('redirect to login');
        }

      }


      }
  
  
   

  }