import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';

import { ProgrammingService } from 'src/app/services/programming.service';

declare var swal: any;

import { Programming } from 'src/app/models/programmings';
import { EnrollmentDetail } from '../../models/enrollment-detail';
import { EnrollmentDetailService } from '../../services/enrollment-detail.service';
import { Student } from 'src/app/models/student';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { saveAs } from 'file-saver';
import { ErrorManager } from 'src/app/errors/error-manager';

@Component({
  selector: 'app-enrollments-course',
  templateUrl: './enrollments-course.component.html',
  styles: []
})
export class EnrollmentsCourseComponent implements OnInit {


  programmings: Programming[] = [];
  students: Student[] = [];
  enrolledStudents: EnrollmentDetail[] = [];
  @ViewChild('btnCloseModal', { static: false }) btnCloseModal: ElementRef;
  selectedRowStudent2 = 0;

  selectedRow = 0;
  selectedRowStudent = 0;
  page = 1;
  skip = 0;
  pageSize = PAGE_SIZE;
  total = 0;
  totalPages = 0;
  loading = false;
  loading2 = false;
  loading3 = false;
  loading4 = true;
  loading5 = true;
  loading7 = false;

  search: string;
  results: string;

  search2: string;
  results2: string;

  page2 = 1;
  skip2 = 0;
  pageSize2 = PAGE_SIZE;
  total2 = 0;
  totalPages2 = 0;


  selectedProgramming: Programming = new Programming();
  mode: number ;

 
  constructor(public programmingService: ProgrammingService, public router: Router,
    public studentService: StudentService, public enrollmentService: EnrollmentService,
    public enrollmentDetailService: EnrollmentDetailService,) { }

  ngOnInit() {
     this.getAllStudents();
     this.getAllProgrammings();
     this.initProgramming();
  }

  onRowClick(i, programming: Programming) {
    this.selectedRow = i;
   this.obtainProgramming(programming._id);
  }

  
  onRowClickStudent(i) {
    this.selectedRowStudent = i;
  }

    
  onRowClickStudent2(i) {
    this.selectedRowStudent2 = i;
  }

  initProgramming(){
    this.selectedProgramming = new Programming();
    this.selectedProgramming.turnId = 0;
    this.selectedProgramming.sectionId = 0;
    this.selectedProgramming.courseId = 0;
    this.selectedProgramming.classroomId = 0;
  }

  getStudents(id) {
    this.loading5 = true;
    this.programmingService.getStudents(id)
    .subscribe((res: any) => {
      this.enrolledStudents = res.programming.students;

      let i = 0;
      this.enrolledStudents.forEach( student=> {
        if (student.studentImg == '')
        student.studentImg = 'xx';  

        student.number = i+1;
        i++;
      });

      this.loading5 = false;

    });
  }

  getAllProgrammings() {
    this.loading = true;
    this.programmingService.getAvailables(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.programmings = res.programmings;
    
      this.programmings.forEach( student=> {
        if (student.teacherImg == '')
        student.teacherImg = 'xx'; 
        
       
      });


      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = (this.skip / this.pageSize) + 1;
      if (this.totalPages === 1) {
        this.results = this.total + ' cursos en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' cursos en ' + this.totalPages + ' páginas.';
      }
      this.loading = false;

      if (this.programmings.length>0) {
        this.obtainProgramming(this.programmings[0]._id);
        this.selectedRow = 0;
      }

    },  error => {
      this.loading = false;
    });
  }

  insertProgramming() {
    this.initProgramming();
    this.mode = 1;
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.searchProgrammings(this.search);
    }
  }

  obtainProgramming(id: string) {
    this.loading4 = true;
    this.programmingService.obtain(id)
    .subscribe((res: any) => {
      this.selectedProgramming = res.programming;

      if (this.selectedProgramming.isDollar == true){
        this.selectedProgramming.selectedMoney = 'Dolares'
    } else{
        this.selectedProgramming.selectedMoney = 'Soles'
    }
 
    if (this.selectedProgramming.startDateShow == '0001-01-01')
        this.selectedProgramming.startDateShow = ''; 

        if (this.selectedProgramming.teacher){
        if (this.selectedProgramming.teacher.img == '')
        this.selectedProgramming.teacher.img = 'xx';  
    }

    this.getStudents(this.selectedProgramming._id);

      this.mode = 2;
      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }


  searchProgrammings(termino: string) {

    if (termino.length <= 0) {
      this.getAllProgrammings();
      return;
    }

      this.loading = true;

    this.programmingService.searchAvailables(termino)
     .subscribe((res: any) => {
      this.programmings = res.programmings;
 
      this.programmings.forEach( student=> {
        if (student.teacherImg == '')
        student.teacherImg = 'xx';  
      });

      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + termino + '"';
      this.loading = false;

      if (this.programmings.length>0) {
        this.obtainProgramming(this.programmings[0]._id);
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
      this.getAllProgrammings();
  }






  saveProgramming(f: NgForm ) {

    this.loading3 = true;

    // if (!this.selectedProgramming.name) {
    //   swal('Validación', 'El nombre es obligatorio', 'error');
    //   this.loading3 = false;
    //   return;
    // }

    if ( f.invalid ) {
      swal('Validación', 'Debe llenar todos los datos requeridos', 'error');
      this.loading3 = false;
      return;
    }

    if (this.selectedProgramming.selectedMoney == 'Dolares'){
      this.selectedProgramming.isDollar = true;
    }

    this.selectedProgramming.startDate = this.selectedProgramming.startDateShow;

    if ( this.mode === 1) {
      this.programmingService.insert( this.selectedProgramming )
      .subscribe( programming => {
        this.mode = 2;
        this.loading3 = false;
        this.getAllProgrammings();
      },  error => {
        this.loading3 = false;
      });

    } else {
      this.programmingService.update(this.selectedProgramming )
      .subscribe( programming => {
        this.loading3 = false;
        this.getAllProgrammings();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  deleteProgramming(programming: Programming, unsubscribe: boolean) {

    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
         this.programmingService.delete( programming._id, unsubscribe )
                   .subscribe( borrado => {
                       this.getAllProgrammings();
                   });
       }

     });

  }

  changeMoney(event: any){
      if (event.target.value.toString() == 'Dolares')
        this.selectedProgramming.priceShow = '$';
      else
        this.selectedProgramming.priceShow = 'S/.';
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

      this.total2 = res.total;
      this.totalPages2 = res.totalPages;
      this.page2 = (this.skip2 / this.pageSize2) + 1;

      if (this.totalPages2 === 1) {
        this.results2 = this.total + ' alumnos en ' + this.totalPages2 + ' página.';
      } else {
        this.results2 = this.total + ' alumnos en ' + this.totalPages2 + ' páginas.';
      }
      this.loading = false;


    },  error => {
      this.loading = false;
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

      this.students.forEach( student=> {
        if (student.img == '')
        student.img = 'xx';  
      });
 
      this.total2 = res.total;
      this.totalPages2 = res.totalPages;
      this.page2 = 1;
      this.results2 = this.total2 + ' resultados para ' + '"' + termino + '"';
      this.loading = false;
     
   },  error => {
    this.loading = false;
  });

  }

  onKeydown2(event, termino: string) {

    this.search2 = termino;
    if (event.key === "Enter") {
      this.searchStudents(this.search2);
    }
  }


  public downloadPDF(): any {

    this.loading7 = true;


    var fileName = this.selectedProgramming.courseName + '.pdf';
    var mediaType = 'application/pdf';

    this.programmingService.downloadPDF(this.selectedProgramming)
      .subscribe( res => {
        this.loading7 = false;

        var blob = new Blob([res], { type: mediaType });
        saveAs(blob, fileName);

      },  error => {
        this.loading7 = false;
        ErrorManager.handleError(error,'No se pudo actualizar');
      });

}


}
