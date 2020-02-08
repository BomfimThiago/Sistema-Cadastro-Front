import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserModel } from 'src/app/model/user.model';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = new UserModel();
  userWantsToRegister: boolean = false;

  constructor(private service: AuthService) { }

  ngOnInit() {
  }

  toRegister(): void  {
    this.userWantsToRegister = !this.userWantsToRegister;
  }

  sendRegister(): void  {
    this.service.register(this.user)
      .subscribe(result =>  {
        alertify.success(`User was successfully created!Please proceed to login`);
        this.toRegister();
      }, error => {
        alertify.error(`Error ${error.status} ${error.statusText}`);
      });
  }
}
