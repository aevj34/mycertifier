import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';
import { CourseGroup } from 'src/app/models/course-group';
import { CourseGroupService } from 'src/app/services/course-group.service';
declare var swal: any;


@Component({
  selector: 'app-course-group',
  templateUrl: './course-group.component.html',
  styles: []
})
export class CourseGroupComponent implements OnInit {


  courseGroups: CourseGroup[] = [];

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

  selectedCourseGroup: CourseGroup = new CourseGroup();
  mode: number ;

 
  constructor(public courseGroupService: CourseGroupService, public router: Router) { }

  ngOnInit() {
    this.selectedCourseGroup.name = '';
     this.getAllCourseGroups();
  }

  onRowClick(i, courseGroup: CourseGroup) {
    this.selectedRow = i;
   this.obtainCourseGroup(courseGroup._id);
  }

  getAllCourseGroups() {
    this.loading = true;
    this.courseGroupService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.courseGroups = res.courseGroups;

      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = (this.skip / this.pageSize) + 1;
      if (this.totalPages === 1) {
        this.results = this.total + ' tipos en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' tipos en ' + this.totalPages + ' páginas.';
      }
      this.loading = false;

      if (this.courseGroups.length>0) {
        this.obtainCourseGroup(this.courseGroups[0]._id);
        this.selectedRow = 0;
      }

    },  error => {
      this.loading = false;
    });
  }

  insertCourseGroup() {
    this.selectedCourseGroup = new CourseGroup('Nuevo tipo');
    this.mode = 1;
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.searchCourseGroups(this.search);
    }
  }

  obtainCourseGroup(id: string) {
    this.loading4 = true;
    this.courseGroupService.obtain(id)
    .subscribe((res: any) => {
      this.selectedCourseGroup = res.courseGroup;
      this.mode = 2;
      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }


  searchCourseGroups(termino: string) {

    if (termino.length <= 0) {
      this.getAllCourseGroups();
      return;
    }

      this.loading = true;

    this.courseGroupService.search(termino)
     .subscribe((res: any) => {
      this.courseGroups = res.courseGroups;
      console.log(res.courseGroups);
      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + termino + '"';
      this.loading = false;

      if (this.courseGroups.length>0) {
        this.obtainCourseGroup(this.courseGroups[0]._id);
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
      this.getAllCourseGroups();
  }






  saveCourseGroup(f: NgForm ) {

    this.loading3 = true;

    if (!this.selectedCourseGroup.name) {
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
      this.courseGroupService.insert( this.selectedCourseGroup )
      .subscribe( courseGroup => {
        this.mode = 2;
        this.loading3 = false;
        this.getAllCourseGroups();
      },  error => {
        this.loading3 = false;
      });

    } else {
      this.courseGroupService.update( this.selectedCourseGroup )
      .subscribe( courseGroup => {
        this.loading3 = false;
        this.getAllCourseGroups();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  deleteCourseGroup(courseGroup: CourseGroup, unsubscribe: boolean) {

    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text + courseGroup.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
         this.courseGroupService.delete( courseGroup._id, unsubscribe )
                   .subscribe( borrado => {
                       this.getAllCourseGroups();
                   });
       }

     });

  }
}
