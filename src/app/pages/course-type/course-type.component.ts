import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';
import { CourseTypeService } from 'src/app/services/course-type.service';
import { CourseType } from 'src/app/models/course-type';
declare var swal: any;


@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styles: []
})
export class CourseTypeComponent implements OnInit {


  courseTypes: CourseType[] = [];

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

  selectedCourseType: CourseType = new CourseType();
  mode: number ;

 
  constructor(public courseTypeService: CourseTypeService, public router: Router) { }

  ngOnInit() {
    this.selectedCourseType.name = '';
     this.getAllCourseTypes();
  }

  onRowClick(i, courseType: CourseType) {
    this.selectedRow = i;
   this.obtainCourseType(courseType._id);
  }

  getAllCourseTypes() {
    this.loading = true;
    this.courseTypeService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.courseTypes = res.courseTypes;

      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = (this.skip / this.pageSize) + 1;
      if (this.totalPages === 1) {
        this.results = this.total + ' tipos en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' tipos en ' + this.totalPages + ' páginas.';
      }
      this.loading = false;

      if (this.courseTypes.length>0) {
        this.obtainCourseType(this.courseTypes[0]._id);
        this.selectedRow = 0;
      }

    },  error => {
      this.loading = false;
    });
  }

  insertCourseType() {
    this.selectedCourseType = new CourseType('Nuevo tipo');
    this.mode = 1;
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.searchCourseTypes(this.search);
    }
  }

  obtainCourseType(id: string) {
    this.loading4 = true;
    this.courseTypeService.obtain(id)
    .subscribe((res: any) => {
      this.selectedCourseType = res.courseType;
      this.mode = 2;
      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }


  searchCourseTypes(termino: string) {

    if (termino.length <= 0) {
      this.getAllCourseTypes();
      return;
    }

      this.loading = true;

    this.courseTypeService.search(termino)
     .subscribe((res: any) => {
      this.courseTypes = res.courseTypes;
      console.log(res.courseTypes);
      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + termino + '"';
      this.loading = false;

      if (this.courseTypes.length>0) {
        this.obtainCourseType(this.courseTypes[0]._id);
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
      this.getAllCourseTypes();
  }






  saveCourseType(f: NgForm ) {

    this.loading3 = true;

    if (!this.selectedCourseType.name) {
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
      this.courseTypeService.insert( this.selectedCourseType )
      .subscribe( courseType => {
        this.mode = 2;
        this.loading3 = false;
        this.getAllCourseTypes();
      },  error => {
        this.loading3 = false;
      });

    } else {
      this.courseTypeService.update( this.selectedCourseType )
      .subscribe( courseType => {
        this.loading3 = false;
        this.getAllCourseTypes();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  deleteCourseType(courseType: CourseType, unsubscribe: boolean) {

    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text + courseType.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
         this.courseTypeService.delete( courseType._id, unsubscribe )
                   .subscribe( borrado => {
                       this.getAllCourseTypes();
                   });
       }

     });

  }
}
