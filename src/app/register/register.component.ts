import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
// import { ErrorStateMatcher } from '@angular/material';
import { CourseTypeService } from '../services/course-type.service';
import { CourseType } from '../models/course-type';
import { ErrorStateMatcher } from '@angular/material';
import { Course } from '../models/course';
import { EnrollmentService } from '../services/enrollment.service';
import { Enrollment } from '../models/enrollment';
import { EnrollmentDetail } from '../models/enrollment-detail';
import { URL_SERVICES } from '../config/config';
declare var swal: any;

/** Error when invalid control is dirty, touched, or submitted. */
 export class MyErrorStateMatcher implements ErrorStateMatcher {
   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
     const isSubmitted = form && form.submitted;
     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
   }
 }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  nameFirstButton = 'REGISTRAR MIS DATOS';

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  loading = false;
  loading3 = false;
  loading4 = false;
  selectedStudent: Student;
  mode: number = 0;
  enrollmentMode: number = 0;
  search: string;
  matcher = new MyErrorStateMatcher();
  courseTypes: CourseType[] = [];

  revalidationCourses: Course[] = [];

  dnis: File[] = [];
  payments: File[] = [];
  revalidations: File[] = [];
  experiences: File[] = [];

  FILES_MAXIMUM: number = 3;

  self = this;

  message = 3;

  enrollmentMessage = false;


  courseMessageHeader = '';  
  courseMessageSubHeader = '';

  selectedEnrollment = new Enrollment();

  constructor(private _formBuilder: FormBuilder, private studentService: StudentService,
    public enrollmentService: EnrollmentService,
    public courseTypeService: CourseTypeService,) {}

  ngOnInit() {

    this.initStudent();
    this.initEnrollment();
    this.getAllCourseTypes();

    this.firstFormGroup = this._formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      secondName: ['', Validators.required],
      lastName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
    
    this.secondFormGroup = this._formBuilder.group({
      _id: ['', Validators.required]
    });

  }

  initStudent(){
    this.selectedStudent = new Student();
    this.mode = 1;
    this.nameFirstButton = 'REGISTRAR MIS DATOS';
  }

  initEnrollment(){
    this.selectedEnrollment = new Enrollment();
    this.enrollmentMode = 1;
  }


  getAllCourseTypes() {
    this.loading4 = true;
    this.courseTypeService.GetAllWithCourses()
    .subscribe((res: any) => {
      this.courseTypes = res.courseTypes;

    },  error => {
      this.loading4 = false;
    });
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.getByDocument(this.search);
    }
  }


  
  getByDocument(termino: string) {



    if (termino.length <= 0) {
      return;
    }

    this.loading = true;


    this.studentService.obtainByDocument(termino)
    .subscribe((res: any) => {
      this.selectedStudent = res.student;

      if (this.selectedStudent.img == '')
      this.selectedStudent.img = 'xx';

      if (this.selectedStudent._id)
       { 
         this.mode = 2;
         this.message = 2;
       }
      else{
        this.mode = 1;
        this.message = 1;
      }
     
  
      this.loading = false;
    },  error => {
      this.mode = 1;
      this.message = 1;
      this.loading = false;
    });

  }


  addDni(archivo: File) {
    if (!archivo) 
      return;

      if (this.dnis.length >= this.FILES_MAXIMUM) {
        swal('Validación', 'Solo está permitido subir ' + this.FILES_MAXIMUM + ' archivos', 'error');
        this.loading3 = false;
        return;
      }

    this.dnis.push(archivo);
  }

  addPayment(archivo: File) {
    if (!archivo) 
      return;

      if (this.payments.length >= this.FILES_MAXIMUM) {
        swal('Validación', 'Solo está permitido subir ' + this.FILES_MAXIMUM + ' archivos', 'error');
        this.loading3 = false;
        return;
      }

    this.payments.push(archivo);
  }

  
  addRevalidation(archivo: File) {
    if (!archivo) 
      return;

      if (this.revalidations.length >= this.FILES_MAXIMUM) {
        swal('Validación', 'Solo está permitido subir ' + this.FILES_MAXIMUM + ' archivos', 'error');
        this.loading3 = false;
        return;
      }

    this.revalidations.push(archivo);
  }

  addExperience(archivo: File) {
    if (!archivo) 
      return;

      if (this.experiences.length >= this.FILES_MAXIMUM) {
        swal('Validación', 'Solo está permitido subir ' + this.FILES_MAXIMUM + ' archivos', 'error');
        this.loading3 = false;
        return;
      }

    this.experiences.push(archivo);
  }

    checkValueNew(e, course: Course){
      course.isRevalidation = false;
       course.isNew = true;

       this.revalidationCourses = [];

       this.courseTypes.forEach(type => {
        type.courses.forEach( course => {
            if (course.isRevalidation)
                this.revalidationCourses.push(course);
        })
      });

     }
  
     checkValueRevalidation(e, course: Course){
      course.isNew = false;
      course.isRevalidation = true;

      this.revalidationCourses = [];

      this.courseTypes.forEach(type => {
        type.courses.forEach( course => {
            if (course.isRevalidation)
                this.revalidationCourses.push(course);
        })
      });

     }

  

     saveEnrollment() {

      this.loading3 = true;

      let c = 0;
      this.courseTypes.forEach( type => {
        type.courses.forEach( course => {
          if (course.isSelected)
            c++;
        });

      });
  
      if (c == 0) {
        swal('Validación', 'Debe seleccionar por lo menos un curso para poder inscribirse', 'error');
        this.loading3 = false;
        return;
      }

      let badCourse: Course;
      let i = 0;

      let k = 0;
      this.courseTypes.forEach( type => {
        type.courses.forEach( course => {
        
          if (course.isSelected){
            k++;
              if (!course.isNew && !course.isRevalidation ){
                i++;
                badCourse = course;
              }
          }
        });

      });

      if (i > 0) {
      swal('Curso: ' + badCourse.name, 'Debe seleccionar la opción nuevo o revalidación', 'error');
      this.loading3 = false;
      return;
      }

      if (k == 1){
        this.courseMessageHeader = 'CURSO AGREGADO!';
        this.courseMessageSubHeader = 'Te has inscrito satisfactoriamente al curso';
      } else{
        this.courseMessageHeader = 'CURSOS AGREGADOS!';
        this.courseMessageSubHeader = 'Te has inscrito satisfactoriamente a los cursos';
      }


      let enrollment = new Enrollment();
  
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
  
      var today2 =  yyyy  +  '-'  + mm + '-' +  dd;
      
      enrollment.enrollmentDate = today2;
      enrollment.student = this.selectedStudent;
      enrollment.studentId = this.selectedStudent._id;
  
      let enrollmentDetails:EnrollmentDetail[] = [];
  
      this.courseTypes.forEach( type => {
          
        type.courses.forEach( course => {

          if (course.isSelected){
            let enrollmentDetail = new EnrollmentDetail();
            enrollmentDetail.courseId = Number(course._id);
            enrollmentDetail.isNew = course.isNew;
            enrollmentDetail.isRevalidation = course.isRevalidation;
            enrollmentDetails.push(enrollmentDetail);
          }

        });

      });
  
      enrollment.enrollmentDetails = enrollmentDetails;


      if (this.enrollmentMode == 1){

        this.enrollmentService.insertFree(enrollment, this.selectedStudent)
        .subscribe( resp => {
         
          this.loading3 = false;
          this.selectedEnrollment = resp.enrollment;
          this.enrollmentMessage = true ;
          this.enrollmentMode = 2;
         
        },  error => {
          this.loading3 = false;
          this.enrollmentMessage = false ;
        });

      } else {

        enrollment._id = this.selectedEnrollment._id;

        this.enrollmentService.update( enrollment )
        .subscribe( resp => {
          this.loading3 = false;
          this.selectedEnrollment = resp.enrollment;
          this.enrollmentMessage = true ;
          console.log(this.selectedEnrollment);

        },  error => {
          this.loading3 = false;
        });

      }

    }


    saveStudent( ) {

      this.loading3 = true;
  
      if (!this.selectedStudent.name) {
        swal('Validación', 'El nombre es obligatorio', 'error');
        this.loading3 = false;
        return;
      }
  
      // if (!this.selectedStudent.ruc) {
      //   swal('Validación', 'El RUC es obligatorio', 'error');
      //   this.loading3 = false;
      //   return;
      // }
  
      if (!this.selectedStudent.document) {
        swal('Validación', 'El DNI es obligatorio', 'error');
        this.loading3 = false;
        return;
      }
  
  
      if ( this.mode === 1) {
        this.studentService.insert( this.selectedStudent )
        .subscribe( res => {

          this.mode = 2;
          this.message = 3;
          this.loading3 = false;

          this.selectedStudent = res.student;
        
          this.nameFirstButton = 'ACTUALIZAR MIS DATOS';

        },  error => {

          this.loading3 = false;
        });
  
      } else {
  
         this.loading3 = false;
      }
  
    }


}
