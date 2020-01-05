import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path: 'departamentos', component:DepartmentComponent},
    {path: 'funcionarios', component:EmployeeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class AppRoutingModule { };