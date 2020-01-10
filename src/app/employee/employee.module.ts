import { NgModule } from '@angular/core';

import { EmployeeComponent } from './employee.component';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './employee.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule
    ],
    exports: [EmployeeComponent, EmployeeDetailsComponent],
    declarations: [EmployeeComponent, EmployeeDetailsComponent],
    providers: [EmployeeService],
})
export class EmployeeModule { }
