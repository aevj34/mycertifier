import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: PagesComponent,
    loadChildren: './pages/pages.module#PagesModule'
  },
  {path: '**', component: LoginComponent},
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
