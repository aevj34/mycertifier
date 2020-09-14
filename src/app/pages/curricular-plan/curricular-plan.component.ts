import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PAGE_SIZE } from 'src/app/config/config';
import { CurricularPlanService } from 'src/app/services/curricular-plan.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CourseGroupService } from '../../services/course-group.service';
declare var swal: any;

import { CourseTypeService } from 'src/app/services/course-type.service';
import { CurricularPlan } from 'src/app/models/curricular-plan';
import { CourseGroup } from 'src/app/models/course-group';
import { CourseType } from 'src/app/models/course-type';


@Component({
  selector: 'app-curricular-plan',
  templateUrl: './curricular-plan.component.html',
  styles: []
})
export class CurricularPlanComponent implements OnInit {


  @ViewChild('btnActiveModal', { static: false }) btnActiveModal: ElementRef;
  @ViewChild('btnReturn', { static: false }) btnReturn: ElementRef;
  @ViewChild('btnCloseModal', { static: false }) btnCloseModal: ElementRef;
  @ViewChild('btnCloseModal2', { static: false }) btnCloseModal2: ElementRef;

  curricularPlans: CurricularPlan[] = [];
  selectedRow = 0;
  selectedCourseRow = 0;

  page = 1;
  skip = 0;
  pageSize = PAGE_SIZE;
  total = 0;
  totalPages = 0;
  loading = false;
  loading2 = true;
  loading3 = false;
  loading4 = false;
  loading5 = false;
  loading6 = false;
  loading7 = false;
  loading8 = false;
  loading9 = false;
  loading10 = false;
  loading11 = false;

  search: string;
  results: string;

  selectedCurricularPlan: CurricularPlan;
  selectedCourse: Course;

  mode: number ;

  activeData: string = '';
  activeCourses: string = '';
  activeDetail: string = '';

  visibleCourse: boolean = false;


  curricularPlansxCourse: CurricularPlan[] = [];



  courseTab: string = ' - ';

  constructor(public curricularPlanService: CurricularPlanService,
              public courseTypeService: CourseTypeService,
              public courseGroupService: CourseGroupService,
              public router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
     this.selectedCurricularPlan = new CurricularPlan()
     this.getAllCurricularPlans(true);

  }




onKeydown(event, termino: string) {

  this.search = termino;
  if (event.key === "Enter") {
    this.searchCurricularPlans(this.search);
  }
}


  onRowClick(i, curricularPlan: CurricularPlan) {
    this.selectedRow = i;
   this.obtainCurricularPlan(curricularPlan._id,1);
  }

  onCourseRowClick(i, course: Course) {
    this.selectedCourseRow = i;
  }


  NavigateToBack(){
    this.btnReturn.nativeElement.click();
  }

  getAllCurricularPlans(selected: boolean) {

    this.loading = true;
    this.curricularPlanService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.curricularPlans = res.curricularPlans;
      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = (this.skip / this.pageSize) + 1;

      if (this.total === 1) {
        this.results = this.total + ' plan curricular en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' planes curriculares en ' + this.totalPages + ' página(s).';
      }

      this.loading = false;

      if (selected){
        if (this.curricularPlans.length>0) {
          this.obtainCurricularPlan(this.curricularPlans[0]._id,1);
          this.selectedRow = 0;
        }
      }
     
    });
  }




  onRowCourseClick(i, course: Course) {
    this.selectedCourseRow = i;
  
  }


  obtainCurricularPlan(id: string, tab: number) {

    this.loading2 = true;
    this.curricularPlanService.obtain(id)
    .subscribe((res: any) => {
      this.selectedCurricularPlan = res.curricularPlan;
      this.mode = 2;
      this.loading2 = false;


      if (tab === 1){
        this.activeData = 'show active';
        this.activeCourses = '';
        this.activeDetail = '';

      } else{
        this.activeData = '';
        this.activeCourses = 'show active';
        this.activeDetail = '';
      }


    });
  }


  searchCurricularPlans(termino: string) {

    this.search = termino;

    if (this.search.length <= 0) {
      this.getAllCurricularPlans(true);
      return;
    }

      this.loading = true;

    this.curricularPlanService.search(this.search)
     .subscribe((res: any) => {
      this.curricularPlans = res.curricularPlans;
      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + this.search + '"';

      this.loading = false;

      if (this.curricularPlans.length>0) {
        this.obtainCurricularPlan(this.curricularPlans[0]._id,1);
        this.selectedRow = 0;
      }

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
      this.getAllCurricularPlans(true);
  }

  insertCurricularPlan() {
    this.loading2 = false;
    this.selectedCurricularPlan = new CurricularPlan('Nuevo plan');
    this.mode = 1;
    this.activeData = 'show active';
    this.activeCourses = '';
    this.activeDetail = '';

  }

  saveCurricularPlan( f: NgForm) {

    this.loading3 = true;

    if (!this.selectedCurricularPlan.name) {
      swal('Validación de plan curricular', 'El nombre es obligatorio', 'error');
      this.loading3 = false;
      return;
    }

    if ( f.invalid ) {
      swal('Validación del plan curricular', 'Debe llenar todos los datos requeridos', 'error');
      this.loading3 = false;
      return;
    }

    this.selectedCurricularPlan.creationDate = this.selectedCurricularPlan.creationDateShow;
    this.selectedCurricularPlan.expiryDate = this.selectedCurricularPlan.expiryDateShow;

    if ( this.mode === 1) {
      this.curricularPlanService.insert( this.selectedCurricularPlan )
      .subscribe( (res: any)  => {
        this.mode = 2;
        this.loading3 = false;
        this.getAllCurricularPlans(false);
      });

    } else {
      this.curricularPlanService.update( this.selectedCurricularPlan )
      .subscribe( curricularPlan => {
        this.loading3 = false;
        this.getAllCurricularPlans(false);
      });
    }

  }

  deleteCurricularPlan(curricularPlan: CurricularPlan, unsubscribe: boolean) {

    
    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text + curricularPlan.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
        this.curricularPlanService.delete( curricularPlan._id, unsubscribe )
        .subscribe( borrado => {

           this.getAllCurricularPlans(false);
         
        });
       }

     });


  }







}
