import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login-model';
import { User } from 'src/app/models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  currentUser: User = new User();

  constructor(public loginService: LoginService) { }

  ngOnInit() {


    this.currentUser = this.loginService.getCurrentUser();
    console.log(this.currentUser);
  }

}
