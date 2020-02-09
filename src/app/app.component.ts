import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { UserModel } from './model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  jwtHelper = new JwtHelperService();

  user = new UserModel();

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.userIsAlreadyLoggedIn();
  }

  userIsAlreadyLoggedIn() {
    const token = localStorage.getItem('token');

    if (token) {
      const aux = this.jwtHelper.decodeToken(token);
      this.user.username = aux.unique_name;
    }
  }
}
