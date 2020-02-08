import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AlertService } from 'ngx-ui-hero';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private service: AuthService,
    private router: Router,
    private alert: AlertService) {

    }
  canActivate(): boolean  {
    if (this.service.loggedIn()) {
      return true;
    }

    this.alert.warning('Warning', 'You must login to have access into the page');
    this.router.navigate(['/register']);
    
    return false;
  }

}
