import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from './department.model';
import { DepartmentService } from './department.service';
import { AlertService } from 'ngx-ui-hero';
import { Router } from '@angular/router';
import { BlockUi } from 'ngx-ui-hero';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  blockUi = new BlockUi();

  department: DepartmentModel;
  departments: DepartmentModel[];

  constructor(
    private departmentService: DepartmentService,
    private alertService: AlertService,
    private router: Router
    ) { }

  ngOnInit() {
    this.carregarTela();
  }

  deleteDepartment(id: string): void {
      this.blockUi.start('Deleting...');

      this.alertService.question('Confirm ', 'Are you sure to delete?', () => {
      this.departmentService.deleteDepartment(id)
        .pipe(finalize(() => this.blockUi.stop()))
        .subscribe(result => {
          this.alertService.success('Feedback', 'Department successfully deleted');
          this.carregarTela();
        }, error => this.alertService.success('Feedback', 'There was an unexpected error')
      );
    });
      this.blockUi.stop();
  }

  private carregarTela(): void {
    this.blockUi.start('Loading...');

    Promise.all([
      this.getAllDepartments()
    ])
    .then(() => this.blockUi.stop())
    .catch(error => {
      this.alertService.error('Feedback', 'Houve um erro inesperado.');
    });
  }
  private getAllDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(result => {
        this.departments = result;
      });
  }


}
