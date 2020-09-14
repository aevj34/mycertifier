import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ModalUploadService } from 'src/app/services/modal-upload.service';
import { LoginService } from 'src/app/services/login.service';
declare var swal: any;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: []
})
export class UserInfoComponent implements OnInit {


  loading = false;
  loading2 = false;
  loading3 = false;
  loading4 = true;

  currentUser: User = new User();
  selectedUser: User = new User();

 
  constructor(public userService: UserService, public router: Router,
    public modalUploadService: ModalUploadService,public loginService: LoginService) { }

  ngOnInit() {
    this.currentUser = this.loginService.getCurrentUser();
    this.initUser();
    this.obtainUser(this.currentUser._id);
  }

  initUser(){
    this.selectedUser = new User();
    this.selectedUser.name = '';
    this.selectedUser.lastName = '';
    this.selectedUser.secondLastName = '';
    this.selectedUser.img = 'xx';
  }



  obtainUser(id: string) {
    this.loading4 = true;
    this.userService.obtain(id)
    .subscribe((res: any) => {
      this.selectedUser = res.user;

      if (this.selectedUser.img == '')
          this.selectedUser.img = 'xx';   

      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }



  saveUser(f: NgForm ) {

    this.loading3 = true;

    if (!this.selectedUser.name) {
      swal('Validación', 'El nombre es obligatorio', 'error');
      this.loading3 = false;
      return;
    }

    if ( f.invalid ) {
      swal('Validación', 'Debe llenar todos los datos requeridos', 'error');
      this.loading3 = false;
      return;
    }


      this.userService.update( this.selectedUser )
      .subscribe( user => {
        this.loading3 = false;
          this.obtainUser(this.selectedUser._id);
      },  error => {
        this.loading3 = false;
      });
    

  }


  changePassword(f: NgForm ) {

    this.loading3 = true;

    if (!this.selectedUser.password) {
      swal('Validación', 'La contraseña nueva es obligatoria', 'error');
      this.loading3 = false;
      return;
    }

    if (!this.selectedUser.repassword) {
      swal('Validación', 'La contraseña nueva es obligatoria', 'error');
      this.loading3 = false;
      return;
    }

    if (this.selectedUser.password != this.selectedUser.repassword) {
      swal('Validación', 'Las contraseñas no son iguales', 'error');
      this.loading3 = false;
      return;
    }

    if ( f.invalid ) {
      swal('Validación', 'Debe llenar todos los datos requeridos', 'error');
      this.loading3 = false;
      return;
    }


      this.userService.changePassword( this.selectedUser )
      .subscribe( user => {
        this.loading3 = false;
 
      },  error => {
        this.loading3 = false;
      });
    

  }

  showModal(id: string) {
    this.modalUploadService.showModal('users', id);
  }

}
