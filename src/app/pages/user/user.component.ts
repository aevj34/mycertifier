import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ModalUploadService } from 'src/app/services/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

 
  users: User[] = [];

  selectedRow = 0;
  page = 1;
  skip = 0;
  pageSize = PAGE_SIZE;
  total = 0;
  totalPages = 0;
  loading = false;
  loading2 = false;
  loading3 = false;
  loading4 = true;

  search: string;
  results: string;

  selectedUser: User = new User();
  mode: number ;

 
  constructor(public userService: UserService, public router: Router,
    public modalUploadService: ModalUploadService,) { }

  ngOnInit() {

    this.initUser();
    this.modalUploadService.notificacion
    .subscribe(res => {
      this.getAllUsers();
    });

    this.selectedUser.name = '';
     this.getAllUsers();

     this.modalUploadService.notificacion
     .subscribe( resp => {
       this.getAllUsers();
       //this.selectedUser.img = resp.user.img;
 
     });

  }

  initUser(){
    this.selectedUser = new User();
    this.selectedUser.name = '';
    this.selectedUser.lastName = '';
    this.selectedUser.secondLastName = '';
    this.selectedUser.img = 'xx';  
  }

  onRowClick(i, user: User) {
    this.selectedRow = i;
   this.obtainUser(user._id);
  }

  getAllUsers() {
    this.loading = true;
    this.userService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.users = res.users;

      this.total = res.total;
      this.totalPages = res.totalPages;

      this.users.forEach( user=> {
        if (user.img == '')
        user.img = 'xx';  
      });

      this.page = (this.skip / this.pageSize) + 1;
      if (this.totalPages === 1) {
        this.results = this.total + ' usuarios en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' usuarios en ' + this.totalPages + ' páginas.';
      }
      this.loading = false;

      if (this.users.length>0) {
        this.obtainUser(this.users[0]._id);
        this.selectedRow = 0;
      }

    },  error => {
      this.loading = false;
    });
  }

  insertUser() {
 this.initUser();
    this.mode = 1;
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.searchUsers(this.search);
    }
  }

  obtainUser(id: string) {
    this.loading4 = true;
    this.userService.obtain(id)
    .subscribe((res: any) => {
      this.selectedUser = res.user;

      if (this.selectedUser.img == '')
          this.selectedUser.img = 'xx';   

      this.mode = 2;
      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }


  searchUsers(termino: string) {

    if (termino.length <= 0) {
      this.getAllUsers();
      return;
    }

      this.loading = true;

    this.userService.search(termino)
     .subscribe((res: any) => {
      this.users = res.users;
 
      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + termino + '"';
      this.loading = false;

      if (this.users.length>0) {
        this.obtainUser(this.users[0]._id);
        this.selectedRow = 0;
      }

     
   },  error => {
    this.loading = false;
  });

  }

  changePage(value: number) {
      const desde = this.skip + value;
      if (desde >= this.total) {
        return;
      }
      if (desde < 0) {
        return;
      }
      this.skip += value;
      this.getAllUsers();
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


    if ( this.mode === 1) {
      this.userService.insert( this.selectedUser )
      .subscribe( user => {
        this.mode = 2;
        this.loading3 = false;
        this.getAllUsers();
      },  error => {
        this.loading3 = false;
      });

    } else {
      this.userService.update( this.selectedUser )
      .subscribe( user => {
        this.loading3 = false;
        this.getAllUsers();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  deleteUser(user: User, unsubscribe: boolean) {

    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
         this.userService.delete( user._id, unsubscribe )
                   .subscribe( borrado => {
                       this.getAllUsers();
                   });
       }

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


    if ( this.mode === 1) {


    } else {

      this.userService.changePassword( this.selectedUser )
      .subscribe( user => {
        this.loading3 = false;
        this.getAllUsers();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  showModal(id: string) {
    this.modalUploadService.showModal('users', id);
  }

}
