import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from './employee.model';
import { DataGridColumnModel, AlertService } from 'ngx-ui-hero';
import { DepartmentModel } from '../department/department.model';
import { DepartmentService } from '../department/department.service';
import { BlockUi } from 'ngx-ui-hero';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  blockUi = new BlockUi();

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
    private departmentService: DepartmentService,
    private alertService: AlertService,
    ) { }

  ngOnInit() {
    this.carregarTela();
  }

  getEmployeesBySearch(): void {
    this.employeeService.getEmployeesBySearch(this.search, this.departmentId)
      .subscribe( result =>  {
        this.employees = result;
    });
  }
  // getEmployeesByDepartmentId() {
  //   this.employeeService.getEmployeesByDepartmentId(this.departmentId)
  //     .subscribe( result =>  this.employees = result);
  // }

  delete(id): void {
      this.alertService.question('Confirm ', 'Are you sure to delete?', () => {
        this.employeeService.deleteEmployee(id)
        .subscribe(result => {
          this.alertService.success('Feedback', 'Employee successfully deleted');
        }, error => console.log(error)
      );
    });
  }

  private carregarTela(): void {
    this.blockUi.start('Loading...');

    Promise.all([
      this.getEmployees(),
      this.getAllDepartments()
    ])
    .then(() => this.blockUi.stop())
    .catch(error => this.alertService.error('feedback', 'There was an unexpected error'));
  }

  private getEmployees(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      this.employeeService.getEmployees()
      .subscribe(result => {
        this.employees = result;
        resolve();
      }, error => console.log(error));
    });
    return promise;
  }

  private getAllDepartments(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      this.departmentService.getDepartments()
      .subscribe(result => {
        this.departments = result;
        resolve();
      }, error => console.log(error));
    });
    return promise;
  }
}
