import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DepartmentModel } from '../department.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  department: DepartmentModel;
  editing: boolean;
  departmentTitle: string;
  imagem: string;
  nome: string;
  descricao: string;

  constructor(
    public location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService
  ) {
    this.department = new DepartmentModel();
   }

  ngOnInit() {
    this.department.Id = this.route.snapshot.params.id;
    this.editing = this.department.Id !== undefined && this.department.Id !== null && this.department.Id !== '';
    this.departmentTitle = this.editing ? 'DepartmentDetails' : 'DepartmentNew';
    this.getDepartmentById();
  }


  getDepartmentById(): void {
    this.departmentService.getDepartmentById(this.department.Id)
      .subscribe(result => {
        console.log(result);
        this.department = result;
      }, error => console.log(error));
  }

}
