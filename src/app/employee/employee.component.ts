import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from './employee.model';
import { DataGridColumnModel, AlertService } from 'ngx-ui-hero';
import { DepartmentModel } from '../department/department.model';
import { DepartmentService } from '../department/department.service';
import { BlockUi } from 'ngx-ui-hero';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  blockUi = new BlockUi();
  department: DepartmentModel;
  departmentId: string;
  search: string ;
  employees: EmployeeModel[];
  departments: DepartmentModel[];
  columns: Array<DataGridColumnModel> = [
    {
      caption: 'Name',
      data: 'name',
    },
    {
      caption: 'E-mail',
      width: '200px',
      data: 'email'
    },
    {
      caption: 'Contact',
      data: 'contact',
    },
    {
      caption: 'Department',
      data: 'department.name'
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

  getEmployeesBySearch(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
       this.employeeService.getEmployeesBySearch(this.search, this.departmentId)
        .subscribe( result =>  {
          this.employees = result;
          if (this.employees.length > 0) {
            this.employees.map(x => {
              this.departments.map(y => {
                if (x.departmentId === y.id) {
                  x.department = y;
                }
              });
            });
          }
          resolve();
      }, error => {
        this.alertService.error('Feedback', `${error.error[0].errorMessage}`);
        reject();
      }
      );
    });
    return promise;
  }
  delete(id): void {
      this.alertService.question('Confirm ', 'Are you sure to delete?', () => {
        this.employeeService.deleteEmployee(id)
        .subscribe(result => {
          this.alertService.success('Feedback', 'Employee successfully deleted');
          this.carregarTela();
        }, error => {
          this.alertService.error('Feedback', `${error.error[0].errorMessage}`);
        }
      );
    });
  }

  private carregarTela(): void {
    this.search = '';
    this.blockUi.start('Loading...');

    Promise.all([
      this.getAllDepartments(),
      this.getEmployeesBySearch()
    ])
    .then(() => this.blockUi.stop())
    .catch(error => {
      this.alertService.error('Feedback', `${error.error[0].errorMessage}`);
      this.blockUi.stop();
    });
  }

  private getAllDepartments(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      this.departmentService.getDepartments()
      .subscribe(result => {
        this.departments = result;
        resolve();
      }, error => {
        this.alertService.error('Feedback', `${error.error[0].errorMessage}`);
        reject();
      });
    });
    return promise;
  }
}
