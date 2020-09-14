import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { CourseGroup } from 'src/app/models/course-group';
import { CourseType } from 'src/app/models/course-type';
import { CourseTypeService } from 'src/app/services/course-type.service';
import { CourseGroupService } from 'src/app/services/course-group.service';
import { RequirementService } from '../../services/requirement.service';
import { Requirement } from 'src/app/models/requirement';
import { ErrorManager } from 'src/app/errors/error-manager';
declare var swal: any;
import { CurricularPlan } from '../../models/curricular-plan';
import { CurricularPlanService } from '../../services/curricular-plan.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styles: []
})
export class CourseComponent implements OnInit {

 
  courses: Course[] = [];

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

  selectedCourse: Course = new Course();
  mode: number ;

  courseGroups: CourseGroup[] = [];
  courseTypes: CourseType[] = [];
  curricularPlans: CurricularPlan[] = [];

  requirements: Course[] = [];
  searchRequirements: string;
  resultsRequirements: string;
  selectedRequirementRow = 0;
  selectedRequirement: Course = new Course();

  selectedRequirementRow2 = 0;
  selectedRequirement2: Course = new Course();


  @ViewChild('btnCloseModal', { static: false }) btnCloseModal: ElementRef;
  
  constructor(public courseService: CourseService, public router: Router,
    public courseTypeService: CourseTypeService,
    public curricularPlanService: CurricularPlanService,
    public requirementService: RequirementService,
    public courseGroupService: CourseGroupService,) { }

  ngOnInit() {
    this.selectedCourse.name = '';
    this.getAllCurricularPlan();
    this.getAllCourseGroup();
    this.getAllCourseType();
     this.getAllCourses();
  }

  onRowClick(i, course: Course) {
    this.selectedRow = i;
   this.obtainCourse(course._id);
  }

  getAllCourseGroup() {
    this.courseGroupService.getAll(0,100)
    .subscribe((res: any) => {
      this.courseGroups = res.courseGroups;
    });
  }

  getAllCurricularPlan() {
    this.curricularPlanService.getAll(0,100)
    .subscribe((res: any) => {
      this.curricularPlans = res.curricularPlans;
    });
  }

  getAllCourseType() {
    this.courseTypeService.getAll(0,100)
    .subscribe((res: any) => {
      this.courseTypes = res.courseTypes;
    });
  }

  getAllCourses() {
    this.loading = true;
    this.courseService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {

      this.courses = res.courses;

      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = (this.skip / this.pageSize) + 1;
      if (this.totalPages === 1) {
        this.results = this.total + ' cursos en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' cursos en ' + this.totalPages + ' páginas.';
      }
      this.loading = false;

      if (this.courses.length>0) {
        this.obtainCourse(this.courses[0]._id);
        this.selectedRow = 0;
      }

    },  error => {
      this.loading = false;
    });
  }

  insertCourse() {
    this.selectedCourse = new Course('Nuevo curso');
    this.selectedCourse.courseGroupId = 0;
    this.selectedCourse.courseTypeId = 0;
    this.selectedCourse.curricularPlanId = 0;
    this.loading4 = false;
    this.mode = 1;
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.searchCourses(this.search);
    }
  }

  obtainCourse(id: string) {
    this.loading4 = true;
    this.courseService.obtain(id)
    .subscribe((res: any) => {
      this.selectedCourse = res.course;

      if (this.selectedCourse.isDollar == true){
          this.selectedCourse.selectedMoney = 'Dolares'
      } else{
          this.selectedCourse.selectedMoney = 'Soles'
      }

      this.mode = 2;
      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }


  searchCourses(termino: string) {

    if (termino.length <= 0) {
      this.getAllCourses();
      return;
    }

      this.loading = true;

    this.courseService.search(termino)
     .subscribe((res: any) => {
      this.courses = res.courses;
 
      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + termino + '"';
      this.loading = false;

      if (this.courses.length>0) {
        this.obtainCourse(this.courses[0]._id);
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
      this.getAllCourses();
  }






  saveCourse(f: NgForm ) {

    this.loading3 = true;

    if (!this.selectedCourse.name) {
      swal('Validación', 'El nombre es obligatorio', 'error');
      this.loading3 = false;
      return;
    }

    if (this.selectedCourse.courseGroupId == 0) {
      swal('Validación', 'El nivel es obligatorio', 'error');
      this.loading3 = false;
      return;
    }

    if (this.selectedCourse.curricularPlanId == 0) {
      swal('Validación', 'El plan de estudios es obligatorio', 'error');
      this.loading3 = false;
      return;
    }

    if (this.selectedCourse.courseTypeId == 0) {
      swal('Validación', 'El tipo es obligatorio', 'error');
      this.loading3 = false;
      return;
    }


    if ( f.invalid ) {
      swal('Validación', 'Debe llenar todos los datos requeridos', 'error');
      this.loading3 = false;
      return;
    }

    if (this.selectedCourse.selectedMoney == 'Dolares'){
      this.selectedCourse.isDollar = true;
    }

    if ( this.mode === 1) {
      this.courseService.insert( this.selectedCourse )
      .subscribe( course => {
        this.mode = 2;
        this.loading3 = false;
        this.getAllCourses();
      },  error => {
        this.loading3 = false;
      });

    } else {
      this.courseService.update(this.selectedCourse )
      .subscribe( course => {
        this.loading3 = false;
        this.getAllCourses();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  deleteCourse(course: Course, unsubscribe: boolean) {

    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text + course.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
         this.courseService.delete( course._id, unsubscribe )
                   .subscribe( borrado => {
                       this.getAllCourses();
                   });
       }

     });

  }



  
  searchRequisites(termino: string) {

    this.searchRequirements = termino;

    if (this.searchRequirements.length <= 0) {
      return;
    }

     //this.loading9 = true;

    this.courseService.searchAllCombo(this.searchRequirements)
     .subscribe((res: any) => {

      this.requirements = res.courses;
 
      this.resultsRequirements = res.total + ' resultados para ' + '"' + this.searchRequirements + '"';

      //this.loading9 = false;

   });


  }

  onRowClickRequirement(i, requirement: Course) {
    this.selectedRequirementRow = i;
    this.selectedRequirement = requirement;
   //this.obtainCurricularPlan(curricularPlan._id,1);
  }

  onKeydownRequirements(event, termino: string) {
    this.searchRequirements = termino;
    if (event.key === "Enter") {
      this.searchRequisites(this.searchRequirements);
    }
  }

  
  addRequirement(){

    if (this.selectedRequirement._id === '' || !this.selectedRequirement._id) {
      swal('Validación de pre-requisito', 'Debe elegir un pre-requisito', 'error');
      this.btnCloseModal.nativeElement.click();
      return;
    }

    let c=0;
    this.selectedCourse.requirements.forEach(requirement => {
        if (requirement.childId.toString() == this.selectedRequirement._id.toString()){
          c++;
        }
    });

    if (c>0) {
      swal('Validación de pre-requisito', 'El curso ' + this.selectedRequirement.name + ' ya es un pre-requisito de ' + this.selectedCourse.name, 'error');
      this.btnCloseModal.nativeElement.click();
      return;
    }
  
    let requirement = new Requirement();
    requirement.parentId = this.selectedCourse._id;
    requirement.childId = this.selectedRequirement._id
    
    this.requirementService.insert(requirement)
    .subscribe( res => {

      //this.selectedCourse.requirements = res.requirements;
 
      ;
       this.btnCloseModal.nativeElement.click();
       this.obtainCourse(this.selectedCourse._id);
    },  error => {

      ErrorManager.handleError(error,'');
    });

  }

  deleteRequirement(requirement: Requirement){

    let text: string;
  
    text = 'Esta a punto de dar de baja el curso pre-requisito: ' + requirement.childName ;
    
    swal( {
      title: '¿Esta seguro?',
      text: text + requirement.childName,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
        this.requirementService.delete(requirement._id, true)
        .subscribe( res => {
          // this.selectedCourse.requirements = res.requirements;
          // this.clearRequirements();
          //this.getCoursesByCurricularPlan(this.selectedCurricularPlan._id);
          
        });
       }

     });



  }

  onRowClickRequirement2(i, requirement: Requirement) {
    this.selectedRequirementRow2 = i;
    this.selectedRequirement2 = requirement;
   //this.obtainCurricularPlan(curricularPlan._id,1);
  }

}
