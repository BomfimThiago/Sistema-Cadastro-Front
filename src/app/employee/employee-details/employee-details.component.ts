import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmployeeModel } from '../employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'ngx-ui-hero';
import { EmployeeService } from '../employee.service';
import { BlockUi } from 'ngx-ui-hero';
import { finalize } from 'rxjs/operators';
import { EmployeeCadastroModel } from '../employee.cadastro.model';
import { DepartmentService } from 'src/app/department/department.service';
import { DepartmentModel } from 'src/app/department/department.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  blockUi = new BlockUi();

  employee: EmployeeModel;
  employeeCadastro: EmployeeCadastroModel;
  departments: Array<DepartmentModel>;
  editing: boolean;
  employeeTitle: string;
  form: FormGroup;

  constructor(
    public location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {
    this.employee = new EmployeeModel();

    this.form = this.formBuilder.group({
      name: [null, [Validators.minLength(3),  Validators.required]],
      contact: [null, Validators.required],
      cpf: [null, [Validators.maxLength(11), Validators.minLength(11), Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      age: [null, Validators.required],
      joinDate: [null, Validators.required],
      resignedDate: [null],
      departmentId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.employee.id = this.route.snapshot.params.id;
    this.editing = this.employee.id !== undefined && this.employee.id != null && this.employee.id !== '';
    this.employeeTitle = this.editing ? 'EmployeeDetail' : 'EmployeeNew';

    this.carregarTela();
  }


  getEmployeeById(): Promise<void> {
    const promise = new Promise<void>( (resolve, reject) => {
        if (this.editing) {
          this.employeeService.getEmployeeById(this.employee.id)
          .subscribe(result => {
            this.form.setValue(result);
            resolve();
          }, error => {
            this.alertService.error('Feedback', `${error.error[0].errorMessage}`);
            reject();
          });
        } else {
          resolve();
        }
      }
    );
    return promise;
  }

  onSubmit(): void {
    if (this.editing) {
     this.updateEmployee();
     this.router.navigate(['/employees']);
    } else {
      this.createEmployee();
      this.form.reset();
      this.router.navigate(['/employees']);
    }
  }

  private carregarTela(): void {
    this.blockUi.start('Carregando...');

    Promise.all([
      this.getAllDepartments(),
      this.getEmployeeById()
    ])
    .then(() => this.blockUi.stop())
    .catch(error => {
      this.alertService.error('Feedback', `${error.error[0].errorMessage}`);
      this.blockUi.stop();
    });
  }

  private createEmployee(): void {
    this.blockUi.start('Criando...');

    this.employeeService.createEmployee(this.form.value)
      .pipe(finalize( () => this.blockUi.stop()))
      .subscribe( result => {
        this.alertService.success('Feedback', 'Employee successfully created');
      }, error => {
        this.alertService.error('Feedback', `${error.error[0].errorMessage}`);
      });
  }

  private updateEmployee(): void {
    this.blockUi.start('Atualizando...');
    this.employee = this.form.value;

    this.employeeService.updateEmployee(this.employee.id, this.employee)
      .pipe(finalize( () => this.blockUi.stop()))
      .subscribe( result => {
        this.alertService.success('Feedback', 'Employee successfully updated');
        this.router.navigate(['employees']);
      }, error => {
        this.alertService.error('Feedback', `${error.error[0].errorMessage}`);
      });
  }

  private getAllDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(result => {
        this.departments = result;
      });
  }
}
