import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmployeeModel } from '../employee.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: EmployeeModel;
  editing: boolean;
  employeeTitle: string;

  constructor(
    public location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employee = new EmployeeModel();
  }

  ngOnInit() {
    this.employee.Id = this.route.snapshot.params.id;
    this.editing = this.employee.Id !== undefined && this.employee.Id != null && this.employee.Id !== '';
    this.employeeTitle = this.editing ? 'EmployeeDetail' : 'EmployeeNew';
  }

}
