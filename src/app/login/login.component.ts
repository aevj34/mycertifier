import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  recuerdame = false;
  loading = false;
  loading2 = false;
  currentYear: number;

  id: string = '';

  conversionEncryptOutput: string;
  conversionEncryptOutput2: string;

  schoolId: string;

  constructor(public loginService: LoginService,
     public route: ActivatedRoute,  public router: Router) { }


  ngOnInit() {


     var today = new Date();
     this.currentYear = today.getFullYear();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }


  }


  ingresar(f: NgForm){


    if ( f.invalid ) {
      swal('Validación', 'Debe llenar todos los datos requeridos', 'error');
      this.loading = false;
      return;
    }

    let user = new User(null, null, f.value.email, f.value.password);

    
this.loading = true;
  this.loginService.login(user,f.value.recuerdame)
  .subscribe(res => {
      this.loading = false;
  },  err => {
    //ErrorManager.handleError(err,'');

    this.loading = false;
    })
  }


}
