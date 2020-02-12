import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './service/auth.service';
import { RegisterComponent } from './layout/register/register.component';
import { Interceptors } from './interceptors/interceptors.service';


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      SharedModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      DepartmentModule,
      EmployeeModule,
      HttpClientModule,
      RouterModule
   ],
   providers: [
      AuthService,
      Interceptors,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: Interceptors,
         multi: true,
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
