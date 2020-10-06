import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { APP_ROUTES } from './app-routing.module';
import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from './pipes/pipes.module';
import { RegisterComponent } from './register/register.component';
import { ErrorStateMatcher, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldControl, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioButton, MatRadioModule, MatStepperModule, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { PagesModule } from './pages/pages.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    PagesModule,
    ReactiveFormsModule,
    PipesModule,
    APP_ROUTES,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
