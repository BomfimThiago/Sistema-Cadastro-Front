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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      HomeComponent
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
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
