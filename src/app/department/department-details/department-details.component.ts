import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DepartmentModel } from '../department.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../department.service';
import { AlertService } from 'ngx-ui-hero';
import { BlockUi } from 'ngx-ui-hero';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  blockUi = new BlockUi();

  department: DepartmentModel ;
  editing: boolean;
  departmentTitle: string;

  constructor(
    public location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private alertService: AlertService
  ) {
    this.department = new DepartmentModel();
   }

  ngOnInit() {
    this.department.id = this.route.snapshot.params.id;
    this.editing = this.department.id !== undefined && this.department.id !== null && this.department.id !== '';
    this.departmentTitle = this.editing ? 'DepartmentDetails' : 'DepartmentNew';

    this.carregarTela();
  }

  onSubmit(form): void {
    if (this.editing) {
      this.updateDepartment();
      this.router.navigate([`departments`]);
    } else {
      this.createDeparment();
      form.reset();
    }
  }

  private carregarTela(): void {
    this.blockUi.start('Loading...');

    Promise.all([
      this.getDepartmentById()
    ])
    .then(() => this.blockUi.stop())
    .catch(error => {
      this.alertService.error('Feedback', 'There was an unexpected error!');
    });
  }

  private getDepartmentById(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      if (this.editing) {
        this.departmentService.getDepartmentById(this.department.id)
        .subscribe(result => {
          this.department = result;
          resolve();
        }, error => console.log(error));
      } else {
        resolve();
      }
    });
    return promise;
  }
  private createDeparment(): void {
      this.blockUi.start('Creating...');

      this.departmentService.createDepartment(this.department)
      .pipe(finalize(() => this.blockUi.stop()))
      .subscribe(result => {
          this.alertService.success('Feedback', 'Department successfully created');
        }, error => {
          this.alertService.error('Feedback', 'There was an unexpected error.');
        });
  }
  private updateDepartment(): void {
    this.blockUi.start('Updating...');

    this.departmentService.updateDepartment(this.department.id, this.department)
      .pipe(finalize(() => this.blockUi.stop()))
      .subscribe(result => {
        this.alertService.success('Feedback', 'Department successfully updated');
      }, error => {
        this.alertService.error('Feedback', 'There was an unexpected error.');
      });
  }
}
