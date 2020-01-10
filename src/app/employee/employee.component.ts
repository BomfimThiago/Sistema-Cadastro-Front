import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from './employee.model';
import { DataGridColumnModel } from 'ngx-ui-hero';
import { DepartmentModel } from '../department/department.model';
import { DepartmentService } from '../department/department.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  departmentId: string;
  search: string;
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
      caption: 'Department',
      data: 'departmentName'
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

  private getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(result => {
        this.employees = result;
      });
  }

  private getAllDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(result => {
        this.departments = result;
      });
  }
  getEmployeesBySearch() {
    this.employeeService.getEmployeesBySearch(this.search, this.departmentId)
      .subscribe( result =>  {
        this.employees = result;
    });
  }
  getEmployeesByDepartmentId() {
    this.employeeService.getEmployeesByDepartmentId(this.departmentId)
      .subscribe( result =>  this.employees = result);
  }

  getEmployeeById(id: string): void {
    this.employeeService.getEmployeeById(id)
      .subscribe(result => {
        console.log(result);
      });
  }

  edit(id) {
    this.getEmployeeById(id);
  
  }
}
