import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from '../shared/shared.module';
import { CourseTypeComponent } from './course-type/course-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../interceptors/token-interceptor.service';
import { CourseGroupComponent } from './course-group/course-group.component';
import { CurricularPlanComponent } from './curricular-plan/curricular-plan.component';
import { CourseComponent } from './course/course.component';
import { ProgrammingComponent } from './programming/programming.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ModalUploadImageComponent } from './modal-upload-image/modal-upload-image.component';
import { ImagePipe } from '../pipes/image.pipe';
import { InscriptionComponent } from './inscription/inscription.component';
import { PipesModule } from '../pipes/pipes.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoadingSpinner2Component } from './loading-spinner2/loading-spinner2.component';
import { EnrollmentsCourseComponent } from './enrollments-course/enrollments-course.component';
import { InvoicesComponent } from './invoices/invoices.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CourseTypeComponent,
    UserComponent,
    CourseGroupComponent,
    CurricularPlanComponent,
    CourseComponent,
    ProgrammingComponent,
    ClassroomComponent,
    TeacherComponent,
    StudentComponent,
    EnrollmentComponent,
    ModalUploadImageComponent,
    InscriptionComponent,
    UserInfoComponent,
    LoadingSpinnerComponent,
    LoadingSpinner2Component,
    EnrollmentsCourseComponent,
    InvoicesComponent
  ],
  exports: [
    DashboardComponent,
    CourseTypeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    SharedModule,
    PAGES_ROUTES
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
})
export class PagesModule { }
