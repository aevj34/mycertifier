import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { ModalUploadService } from 'src/app/services/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styles: []
})
export class TeacherComponent implements OnInit {


  teachers: Teacher[] = [];

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

  selectedTeacher: Teacher = new Teacher();
  mode: number ;

 
  constructor(public teacherService: TeacherService, public router: Router,
    public modalUploadService: ModalUploadService,) { }

  ngOnInit() {

    this.initTeacher();
    this.modalUploadService.notificacion
    .subscribe(res => {
      this.getAllTeachers();
    });

    this.selectedTeacher.name = '';
     this.getAllTeachers();
  }

  onRowClick(i, teacher: Teacher) {
    this.selectedRow = i;
   this.obtainTeacher(teacher._id);
  }

  getAllTeachers() {
    this.loading = true;
    this.teacherService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.teachers = res.teachers;

      this.teachers.forEach( student=> {
        if (student.img == '')
        student.img = 'xx';  
      });


      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = (this.skip / this.pageSize) + 1;
      if (this.totalPages === 1) {
        this.results = this.total + ' docentes en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' docentes en ' + this.totalPages + ' páginas.';
      }
      this.loading = false;

      if (this.teachers.length>0) {
        this.obtainTeacher(this.teachers[0]._id);
        this.selectedRow = 0;
      }

    },  error => {
      this.loading = false;
    });
  }

  initTeacher(){
    this.selectedTeacher = new Teacher('Nuevo docente');
    this.selectedTeacher.sex = '';
    this.selectedTeacher.img = 'xx';
  }

  insertTeacher() {
    this.initTeacher();
    this.mode = 1;
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.searchTeachers(this.search);
    }
  }

  obtainTeacher(id: string) {
    this.loading4 = true;
    this.teacherService.obtain(id)
    .subscribe((res: any) => {
      this.selectedTeacher = res.teacher;

      if (this.selectedTeacher.img == '')
      this.selectedTeacher.img = 'xx';  
  
      this.mode = 2;
      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }


  searchTeachers(termino: string) {

    if (termino.length <= 0) {
      this.getAllTeachers();
      return;
    }

      this.loading = true;

    this.teacherService.search(termino)
     .subscribe((res: any) => {
      this.teachers = res.teachers;
 
      this.teachers.forEach( student=> {
        if (student.img == '')
        student.img = 'xx';  
      });


      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + termino + '"';
      this.loading = false;

      if (this.teachers.length>0) {
        this.obtainTeacher(this.teachers[0]._id);
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
      this.getAllTeachers();
  }






  saveTeacher(f: NgForm ) {

    this.loading3 = true;

    if (!this.selectedTeacher.name) {
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
      this.teacherService.insert( this.selectedTeacher )
      .subscribe( teacher => {
        this.mode = 2;
        this.loading3 = false;
        this.getAllTeachers();
      },  error => {
        this.loading3 = false;
      });

    } else {
      this.teacherService.update( this.selectedTeacher )
      .subscribe( teacher => {
        this.loading3 = false;
        this.getAllTeachers();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  deleteTeacher(teacher: Teacher, unsubscribe: boolean) {

    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text + teacher.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
         this.teacherService.delete( teacher._id, unsubscribe )
                   .subscribe( borrado => {
                       this.getAllTeachers();
                   });
       }

     });

  }

 showModal(id: string) {
    this.modalUploadService.showModal('teachers', id);
  }


}
