import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';
import { Enrollment } from 'src/app/models/enrollment';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { EnrollmentDetailService } from '../../services/enrollment-detail.service';
import { EnrollmentDetail } from '../../models/enrollment-detail';
import { ProgrammingService } from '../../services/programming.service';
import { Programming } from 'src/app/models/programmings';
declare var swal: any;
@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styles: []
})
export class EnrollmentComponent implements OnInit {

  @ViewChild('btnCloseModal', { static: false }) btnCloseModal: ElementRef;
  
  enrollments: Enrollment[] = [];

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

  students: Student[] = [];
  programmings: Programming[] = [];

  selectedEnrollment: Enrollment = new Enrollment();
  mode: number ;

  selectedEnrollmentDetail: EnrollmentDetail = new EnrollmentDetail();
  modeEnrollmentDetail: number ;
  selectedRowEnrollmentDetail = 0;

  constructor(public enrollmentService: EnrollmentService, public enrollmentDetailService: EnrollmentDetailService,
    public studentService: StudentService, 
    public programmingService: ProgrammingService,
    public router: Router) { }

  ngOnInit() {
    this.initEnrollmentDetail();
    this.getProgrammings();
      this.getAllStudents();
     this.getAllEnrollments();
  }

  onRowClick(i, enrollment: Enrollment) {
    this.selectedRow = i;
   this.obtainEnrollment(enrollment._id);
  }


  initEnrollmentDetail(){
    this.selectedEnrollmentDetail = new EnrollmentDetail();
  }

  getProgrammings() {
    this.programmingService.getAvailables(0,200)
    .subscribe((res: any) => {
      this.programmings = res.programmings;
    });
  }

  
  getAllStudents() {
    this.studentService.getAllCombo()
    .subscribe((res: any) => {
      this.students = res.students;
    });
  }

  // getDetails(id) {
  //   this.enrollmentDetailService.getByEnrollment(id)
  //   .subscribe((res: any) => {
  //     this.enrollmentDetails = res.enrollmentDetails;
  //   });
  // }

  getAllEnrollments() {
    this.loading = true;
    this.enrollmentService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.enrollments = res.enrollments;

      this.enrollments.forEach( student=> {
        if (student.studentImg == '')
        student.studentImg = 'xx';  
      });

      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = (this.skip / this.pageSize) + 1;
      if (this.totalPages === 1) {
        this.results = this.total + ' alumnos matriculados en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' alumnos matriculados en ' + this.totalPages + ' páginas.';
      }
      this.loading = false;

      if (this.enrollments.length>0) {
        this.obtainEnrollment(this.enrollments[0]._id);
        this.selectedRow = 0;
      }

    },  error => {
      this.loading = false;
    });
  }

  insertEnrollment() {
    this.selectedEnrollment = new Enrollment();
    this.selectedEnrollment.studentId = '0';

    this.mode = 1;
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.searchEnrollments(this.search);
    }
  }

  obtainEnrollment(id: string) {
    this.loading4 = true;
    this.enrollmentService.obtain(id)
    .subscribe((res: any) => {
      this.selectedEnrollment = res.enrollment;

      if (this.selectedEnrollment.studentImg == '')
      this.selectedEnrollment.studentImg = 'xx';   

      
      this.mode = 2;
      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }


  searchEnrollments(termino: string) {

    if (termino.length <= 0) {
      this.getAllEnrollments();
      return;
    }

      this.loading = true;

    this.enrollmentService.search(termino)
     .subscribe((res: any) => {
      this.enrollments = res.enrollments;

      this.enrollments.forEach( student=> {
        if (student.studentImg == '')
        student.studentImg = 'xx';  
      });


      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + termino + '"';
      this.loading = false;

      if (this.enrollments.length>0) {
        this.obtainEnrollment(this.enrollments[0]._id);
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
      this.getAllEnrollments();
  }






  saveEnrollment(f: NgForm ) {

    this.loading3 = true;

    // if (!this.selectedEnrollment.name) {
    //   swal('Validación', 'El nombre es obligatorio', 'error');
    //   this.loading3 = false;
    //   return;
    // }




    if ( f.invalid ) {
      swal('Validación', 'Debe llenar todos los datos requeridos', 'error');
      this.loading3 = false;
      this.btnCloseModal.nativeElement.click();
      return;
    }

    this.selectedEnrollment.enrollmentDate = this.selectedEnrollment.enrollmentDateShow;

    if ( this.mode === 1) {
      // this.enrollmentService.insert( this.selectedEnrollment, this.sele )
      // .subscribe( enrollment => {
      //   this.mode = 2;
      //   this.loading3 = false;
      //   this.getAllEnrollments();
      // },  error => {
      //   this.loading3 = false;
      // });

    } else {
      this.enrollmentService.update( this.selectedEnrollment )
      .subscribe( enrollment => {
        this.loading3 = false;
        this.btnCloseModal.nativeElement.click();
        this.getAllEnrollments();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  deleteEnrollment(enrollment: Enrollment, unsubscribe: boolean) {

    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text + enrollment.studentName + ' ' + enrollment.studentLastName,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
         this.enrollmentService.delete( enrollment._id, unsubscribe )
                   .subscribe( borrado => {
                       this.getAllEnrollments();
                   });
       }

     });

  }

  insertEnrollmentDetail() {
    this.selectedEnrollmentDetail = new EnrollmentDetail();
    this.selectedEnrollmentDetail.programmingId = '0';

    this.modeEnrollmentDetail = 1;
  }


  saveEnrollmentDetail(f: NgForm ) {

    this.loading3 = true;

    

    let c = 0;
    this.selectedEnrollment.enrollmentDetails.forEach(detail => {
      console.log(this.selectedEnrollmentDetail.programmingId.toString(),detail.programmingId.toString());
        if (this.selectedEnrollmentDetail.programmingId.toString() == detail.programmingId.toString())
        c++;
    });

    if (c>0) {
      swal('Validación', 'El alumno ya está matriculado en el curso', 'error');
      this.loading3 = false;
      this.btnCloseModal.nativeElement.click();
      return;
    }

    if ( f.invalid ) {
      swal('Validación', 'Debe llenar todos los datos requeridos', 'error');
      this.loading3 = false;
      this.btnCloseModal.nativeElement.click();
      return;
    }

  this.selectedEnrollmentDetail.enrollmentId = this.selectedEnrollment._id;


    if ( this.modeEnrollmentDetail === 1) {
      this.enrollmentDetailService.insert( this.selectedEnrollmentDetail )
      .subscribe( enrollmentDetail => {
        this.mode = 2;
        this.loading3 = false;
        this.btnCloseModal.nativeElement.click();
        this.obtainEnrollment(this.selectedEnrollment._id);
      },  error => {
        this.loading3 = false;
      });

    } else {
      this.enrollmentDetailService.update( this.selectedEnrollmentDetail )
      .subscribe( enrollment => {
        this.loading3 = false;
        this.btnCloseModal.nativeElement.click();
        this.obtainEnrollment(this.selectedEnrollment._id);
      },  error => {
        this.loading3 = false;
      });
    }

  }

  changeProgramming(event: any){

   

    this.programmings.forEach(programming => {

      if (event.target.value.toString() == programming._id.toString()){
        this.selectedEnrollmentDetail.courseId = programming.courseId;
        this.selectedEnrollmentDetail.turnId = programming.turnId;
        this.selectedEnrollmentDetail.sectionId = programming.sectionId;

      }
    });

}

onRowClickEnrollmentDetail(i, detail: EnrollmentDetail) {
  this.selectedRowEnrollmentDetail = i;
  this.obtainDetail(detail._id);
 
}


obtainDetail(id){
  this.enrollmentDetailService.obtain(id)
  .subscribe((res: any) => {
    this.selectedEnrollmentDetail = res.enrollmentDetail;
    this.modeEnrollmentDetail = 2;
    this.loading4 = false;
  },  error => {
    this.loading4 = false;
  });
}


deleteEnrollmentDetail(enrollmentDetail: EnrollmentDetail, unsubscribe: boolean) {

  let text: string;
  if (unsubscribe) {
    text = 'Esta a punto de dar de baja a ';
  } else {
    text = 'Esta a punto de activar a ';
  }

  swal( {
    title: '¿Esta seguro?',
    text: text + enrollmentDetail.courseName,
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
   .then( borrar => {
     if (borrar) {
       this.enrollmentDetailService.delete( enrollmentDetail._id, unsubscribe,this.selectedEnrollment._id )
                 .subscribe( borrado => {
                     this.obtainEnrollment(this.selectedEnrollment._id);
                 });
     }

   });

}

}
