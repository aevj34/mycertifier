import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_SIZE } from 'src/app/config/config';
import { NgForm } from '@angular/forms';
import { Classroom } from 'src/app/models/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';
declare var swal: any;

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styles: []
})
export class ClassroomComponent implements OnInit {


  classrooms: Classroom[] = [];

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

  selectedClassroom: Classroom = new Classroom();
  mode: number ;

 
  constructor(public classroomService: ClassroomService, public router: Router) { }

  ngOnInit() {
    this.selectedClassroom.name = '';
     this.getAllClassrooms();
  }

  onRowClick(i, classroom: Classroom) {
    this.selectedRow = i;
   this.obtainClassroom(classroom._id);
  }

  getAllClassrooms() {
    this.loading = true;
    this.classroomService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.classrooms = res.classrooms;

      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = (this.skip / this.pageSize) + 1;
      if (this.totalPages === 1) {
        this.results = this.total + ' aulas en ' + this.totalPages + ' página.';
      } else {
        this.results = this.total + ' aulas en ' + this.totalPages + ' páginas.';
      }
      this.loading = false;

      if (this.classrooms.length>0) {
        this.obtainClassroom(this.classrooms[0]._id);
        this.selectedRow = 0;
      }

    },  error => {
      this.loading = false;
    });
  }

  insertClassroom() {
    this.selectedClassroom = new Classroom('Nuevo tipo');
    this.mode = 1;
  }

  onKeydown(event, termino: string) {

    this.search = termino;
    if (event.key === "Enter") {
      this.searchClassrooms(this.search);
    }
  }

  obtainClassroom(id: string) {
    this.loading4 = true;
    this.classroomService.obtain(id)
    .subscribe((res: any) => {
      this.selectedClassroom = res.classroom;
      this.mode = 2;
      this.loading4 = false;
    },  error => {
      this.loading4 = false;
    });
  }


  searchClassrooms(termino: string) {

    if (termino.length <= 0) {
      this.getAllClassrooms();
      return;
    }

      this.loading = true;

    this.classroomService.search(termino)
     .subscribe((res: any) => {
      this.classrooms = res.classrooms;
      console.log(res.classrooms);
      this.total = res.total;
      this.totalPages = res.totalPages;
      this.page = 1;
      this.results = this.total + ' resultados para ' + '"' + termino + '"';
      this.loading = false;

      if (this.classrooms.length>0) {
        this.obtainClassroom(this.classrooms[0]._id);
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
      this.getAllClassrooms();
  }






  saveClassroom(f: NgForm ) {

    this.loading3 = true;

    if (!this.selectedClassroom.name) {
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
      this.classroomService.insert( this.selectedClassroom )
      .subscribe( classroom => {
        this.mode = 2;
        this.loading3 = false;
        this.getAllClassrooms();
      },  error => {
        this.loading3 = false;
      });

    } else {
      this.classroomService.update( this.selectedClassroom )
      .subscribe( classroom => {
        this.loading3 = false;
        this.getAllClassrooms();
      },  error => {
        this.loading3 = false;
      });
    }

  }

  deleteClassroom(classroom: Classroom, unsubscribe: boolean) {

    let text: string;
    if (unsubscribe) {
      text = 'Esta a punto de dar de baja a ';
    } else {
      text = 'Esta a punto de activar a ';
    }

    swal( {
      title: '¿Esta seguro?',
      text: text + classroom.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
     .then( borrar => {
       if (borrar) {
         this.classroomService.delete( classroom._id, unsubscribe )
                   .subscribe( borrado => {
                       this.getAllClassrooms();
                   });
       }

     });

  }
}
