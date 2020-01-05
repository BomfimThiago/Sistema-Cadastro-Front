import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from './employee.model';
import { ThrowStmt } from '@angular/compiler';
import { DataGridColumnModel } from 'ngx-ui-hero';
import { DepartmentModel } from '../department/department.model';
import { DepartmentService } from '../department/department.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: EmployeeModel[];
  departments: DepartmentModel[];
  columns: Array<DataGridColumnModel> = [
    {
      caption: 'Name',
      data: 'name',
    },
    {
      caption: 'E-mail',
      data: 'email'
    },
    {
      caption: 'Contact',
      data: 'contact',
    },
    {
      caption: 'DepartmentId',
      data: 'departmentId'
    },
  ];
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
    ) { }

  ngOnInit() {
    this.getEmployees();
    this.getAllDepartments();
  }

  getEmployees() {
    this.employeeService.getEmployee()
      .subscribe(result => {
        this.employees = result;
        console.log(result);
      });
  }

  private getAllDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(result => {
        this.departments = result;
        console.log(this.departments);
      });
  }

}
