import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from './department.model';
import { DepartmentService } from './department.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  department: DepartmentModel;
  departments: DepartmentModel[];
  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getAllDepartments();
  }

  private getAllDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(result => {
        this.departments = result;
      });
  }



}
