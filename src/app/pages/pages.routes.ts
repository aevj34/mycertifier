import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { CourseTypeComponent } from './course-type/course-type.component';
import { UserComponent } from './user/user.component';
import { LoginGuard } from '../guards/login.guard';
import { CourseGroupComponent } from './course-group/course-group.component';
import { CurricularPlan } from '../models/curricular-plan';
import { CurricularPlanComponent } from './curricular-plan/curricular-plan.component';
import { CourseComponent } from './course/course.component';
import { ProgrammingComponent } from './programming/programming.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { UserInfoComponent } from './user-info/user-info.component';

const pagesRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate:[LoginGuard], data: { titulo: 'Dashboard'} },
    {path: 'course-type', component: CourseTypeComponent, canActivate:[LoginGuard], data: { titulo: 'Tipos de cursos'} },
    {path: 'course-group', component: CourseGroupComponent, canActivate:[LoginGuard], data: { titulo: 'Niveles de cursos'} },
    {path: 'curricular-plan', component: CurricularPlanComponent, canActivate:[LoginGuard], data: { titulo: 'Plan curricular'} },
    {path: 'course', component: CourseComponent, canActivate:[LoginGuard], data: { titulo: 'Cursos'} },
    {path: 'user', component: UserComponent, canActivate:[LoginGuard], data: { titulo: 'Usuarios'} },
    {path: 'teacher', component: TeacherComponent, canActivate:[LoginGuard], data: { titulo: 'Docentes'} },
    {path: 'student', component: StudentComponent, canActivate:[LoginGuard], data: { titulo: 'Alumnos'} },
    {path: 'programming', component: ProgrammingComponent, canActivate:[LoginGuard], data: { titulo: 'Programación de cursos'} },
    {path: 'classroom', component: ClassroomComponent, canActivate:[LoginGuard], data: { titulo: 'Aulas'} },
    {path: 'enrollment', component: EnrollmentComponent, canActivate:[LoginGuard], data: { titulo: 'Rectificación de Matrícula'} },
    {path: 'inscription', component: InscriptionComponent, canActivate:[LoginGuard], data: { titulo: 'Matrícula'} },
    {path: 'user-info', component: UserInfoComponent, canActivate:[LoginGuard], data: { titulo: 'Información personal'} },
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

