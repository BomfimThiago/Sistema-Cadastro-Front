import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  baseUrl = `http://localhost:5000/api/Auth/`
  constructor(private http: HttpClient) { }

  login(user: UserModel) {
    return this.http.post(this.baseUrl +  'Login', user)
      .pipe(map((response: any) => {
        const userLogged =  response;
        if (userLogged) {
          localStorage.setItem('token', userLogged.token);
        }
      })
    );
  }

  register(user: UserModel) {
    return this.http.post(this.baseUrl + 'Register', user);
  }
}
