import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';

import { ProgrammingService } from 'src/app/services/programming.service';

declare var swal: any;

import { Programming } from 'src/app/models/programmings';
import { Section } from '../../models/section';
import { Turn } from 'src/app/models/turn';
import { SectionService } from '../../services/section.service';
import { TurnService } from '../../services/turn.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { Classroom } from '../../models/classroom';
import { ClassroomService } from '../../services/classroom.service';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html',
  styles: []
})
export class ProgrammingComponent implements OnInit {


  programmings: Programming[] = [];
  sections: Section[] = [];
  turns: Turn[] = [];
  courses: Course[] = [];
  classrooms: Classroom[] = [];
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

  selectedProgramming: Programming = new Programming();
  mode: number ;

  @ViewChild('btnCloseModal', { static: false }) btnCloseModal: ElementRef;
  
  constructor(public programmingService: ProgrammingService, public router: Router,
    public sectionService: SectionService, public turnService: TurnService,
    public teacherService: TeacherService,
    public classroomService: ClassroomService,
    public courseService: CourseService) { }

  ngOnInit() {

    this.initProgramming();

    this.getAllTeachers();



   
  }

  onRowClick(i, programming: Programming) {
    this.selectedRow = i;
   this.obtainProgramming(programming._id);
  }

  initProgramming(){
    this.selectedProgramming = new Programming();
    this.selectedProgramming.turnId = 0;
    this.selectedProgramming.sectionId = 0;
    this.selectedProgramming.courseId = 0;
    this.selectedProgramming.classroomId = 0;
  }

  getAllTeachers() {
    this.teacherService.getAllCombo()
    .subscribe((res: any) => {
      this.teachers = res.teachers;

       this.getAllCourses();

    });
  }

  getAllClassrooms() {
    this.classroomService.getAll(0,200)
    .subscribe((res: any) => {
      this.classrooms = res.classrooms;

         
     this.getAllTurns();


    });
  }

  getAllTurns() {
    this.turnService.getAll()
    .subscribe((res: any) => {

      this.turns = res.turns;

      this.getAllSections();

    });
  }

  getAllCourses() {
    this.courseService.getAllCombo()
    .subscribe((res: any) => {
      this.courses = res.courses;

         this.getAllClassrooms();

    });
  }

  getAllSections() {
    this.sectionService.getAll()
    .subscribe((res: any) => {
      this.sections = res.sections;

      this.getAllProgrammings();

    });
  }

  getAllProgrammings() {
    this.loading = true;
    this.programmingService.getAll(this.skip, this.pageSize)
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

    this.programmingService.search(termino)
     .subscribe((res: any) => {
      this.programmings = res.programmings;
 
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
    
  changeCourse(event: any){

    this.courses.forEach(course => {
      if (course._id == event.target.value.toString()){
          this.selectedProgramming.price = course.price;

          if (course.isDollar == true){
            this.selectedProgramming.selectedMoney = 'Dolares'
        } else{
            this.selectedProgramming.selectedMoney = 'Soles'
        }

      }
    });

  }


}
