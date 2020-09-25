import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { ModalUploadService } from 'src/app/services/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styles: []
})
export class StudentComponent implements OnInit {


  students: Student[] = [];

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

  selectedStudent: Student = new Student();
  mode: number ;

 
  constructor(public studentService: StudentService, public router: Router,
    public modalUploadService: ModalUploadService,) { }

  ngOnInit() {

    this.initStudent();
    this.modalUploadService.notificacion
    .subscribe(res => {
      this.getAllStudents();
    });

    this.selectedStudent.name = '';
     this.getAllStudents();
  }

  onRowClick(i, student: Student) {
    this.selectedRow = i;
   this.obtainStudent(student._id);
  }

  getAllStudents() {
    this.loading = true;
    this.studentService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.students = res.students;

      this.students.forEach( student=> {
        if (student.img == '')
        student.img = 'xx';  
      });

      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = (this.skip / this.pageSize) + 1;
      if (this.totalPages === 1) {
        this.results = this.total + ' alumnos en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' alumnos en ' + this.totalPages + ' páginas.';
      }
      this.loading = false;

      if (this.students.length>0) {
        this.obtainStudent(this.students[0]._id);
        this.selectedRow = 0;
      }

    },  error => {
      this.loading = false;
    });
  }

  
  initStudent() {
    this.selectedStudent = new Student('Nuevo alumno');
    this.selectedStudent.sex = '';
    this.selectedStudent.img = 'xx';
    this.mode = 1;
  }

  insertStudent() {
  this.initStudent();
    this.mode = 1;
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.searchStudents(this.search);
    }
  }

  obtainStudent(id: string) {
    this.loading4 = true;
    this.studentService.obtain(id)
    .subscribe((res: any) => {
      this.selectedStudent = res.student;

      if (this.selectedStudent.img == '')
      this.selectedStudent.img = 'xx';  

      this.mode = 2;
      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }


  searchStudents(termino: string) {

    if (termino.length <= 0) {
      this.getAllStudents();
      return;
    }

      this.loading = true;

    this.studentService.search(termino)
     .subscribe((res: any) => {
      this.students = res.students;
 
      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + termino + '"';
      this.loading = false;

      if (this.students.length>0) {
        this.obtainStudent(this.students[0]._id);
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
      this.getAllStudents();
  }






  saveStudent(f: NgForm ) {

    this.loading3 = true;

    if (!this.selectedStudent.name) {
      swal('Validación', 'El nombre es obligatorio', 'error');
      this.loading3 = false;
      return;
    }

    if (!this.selectedStudent.ruc) {
      swal('Validación', 'El RUC es obligatorio', 'error');
      this.loading3 = false;
      return;
    }

    if (!this.selectedStudent.document) {
      swal('Validación', 'El DNI es obligatorio', 'error');
      this.loading3 = false;
      return;
    }

    if ( f.invalid ) {
      swal('Validación', 'Debe llenar todos los datos requeridos', 'error');
      this.loading3 = false;
      return;
    }


    if ( this.mode === 1) {
      this.studentService.insert( this.selectedStudent )
      .subscribe( student => {
        this.mode = 2;
        this.loading3 = false;
        this.getAllStudents();
      },  error => {
        this.loading3 = false;
      });

    } else {
      this.studentService.update( this.selectedStudent )
      .subscribe( student => {
        this.loading3 = false;
        this.getAllStudents();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  deleteStudent(student: Student, unsubscribe: boolean) {

    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text + student.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
         this.studentService.delete( student._id, unsubscribe )
                   .subscribe( borrado => {
                       this.getAllStudents();
                   });
       }

     });

  }


  showModal(id: string) {
    this.modalUploadService.showModal('students', id);
  }



}
