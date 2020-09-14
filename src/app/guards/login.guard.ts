import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate  {

  constructor(public loginService: LoginService, public router: Router) { }

  user: User = new User();

  canActivate() {

    if (this.loginService.isAuthenticated()) {
      
      return true;
    } else {

      Swal.fire('Sesión Finalizada', 'Su sesión en el sistema ha terminado - FE', 'error');
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
