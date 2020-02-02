import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { AlertService } from 'ngx-ui-hero';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLoggedIn: boolean = false;
  user = new UserModel();
  constructor(
    private service: AuthService,
    private alertService: AlertService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login(): void {
    this.service.login(this.user)
      .subscribe(result => {
        this.userLoggedIn = true;
        this.router.navigate(['/home']);
      }, error => {
        this.alertService.error('Feedback', `${error.message}`);
    });
  }

  logout(): void {
    this.userLoggedIn = false;
    this.router.navigate(['/register']);
  }

}
