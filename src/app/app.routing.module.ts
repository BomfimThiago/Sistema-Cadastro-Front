import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentDetailsComponent } from './department/department-details/department-details.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'departments', component: DepartmentComponent},
    {path: 'departments/new', component: DepartmentDetailsComponent},
    {path: 'departments/:id', component: DepartmentDetailsComponent},
    {path: 'employees', component: EmployeeComponent},
    {path: 'employees/new', component: EmployeeDetailsComponent},
    {path: 'employees/:id', component: EmployeeDetailsComponent}
 ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class AppRoutingModule { }
