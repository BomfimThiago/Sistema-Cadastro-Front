import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentDetailsComponent } from './department/department-details/department-details.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { RegisterComponent } from './layout/register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    {path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        {path: 'home', component: HomeComponent},
        {path: 'departments', component: DepartmentComponent},
        {path: 'departments/new', component: DepartmentDetailsComponent},
        {path: 'departments/:id', component: DepartmentDetailsComponent},
        {path: 'employees', component: EmployeeComponent},
        {path: 'employees/new', component: EmployeeDetailsComponent},
        {path: 'employees/:id', component: EmployeeDetailsComponent},
      ]
    },
    {path: 'register', component: RegisterComponent}
 ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class AppRoutingModule { }
