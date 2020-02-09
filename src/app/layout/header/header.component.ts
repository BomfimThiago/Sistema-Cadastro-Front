import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector:'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLoggedIn: boolean = false;
  @Input() user = new UserModel();
  constructor(
    private service: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.user.username) {
      this.userLoggedIn = true;
    }
  }

  login(): void {
    this.service.login(this.user)
      .subscribe(result => {
        this.userLoggedIn = true;
        alertify.success(`Welcome ${this.changeNameToTitleCase(this.user.username)}`);
      }, error => {
        alertify.error(`Error ${error.status} ${error.statusText}`);
      }, () => {
       this.router.navigate(['/home']);
    });
  }

  loggedIn() {
    return this.service.loggedIn();
  }

  logout(): void {
    this.userLoggedIn = false;
    this.user = new UserModel();
    localStorage.removeItem('token');
    this.router.navigate(['/register']);
  }

  changeNameToTitleCase(name: any): string {
    name = name.toLowerCase().split(' ');
    for (let i = 0; i < name.length; i++) {
      name[i] = name[i].charAt(0).toLocaleUpperCase() + name[i].slice(1);
    }
    return name.join(' ');
  }

}
