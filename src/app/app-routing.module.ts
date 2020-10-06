import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'company',
    component: PagesComponent,
    loadChildren: './pages/pages.module#PagesModule'
  },
  // {
  //   path: 'teacher',
  //   component: TeachersPagesComponent,
  //   loadChildren: './teachers-pages/teachers.module#TeachersModule'
  // },
  {path: '**', component: LoginComponent},
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
