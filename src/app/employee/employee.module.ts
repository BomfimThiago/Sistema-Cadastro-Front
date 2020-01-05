import { NgModule } from '@angular/core';

import { EmployeeComponent } from './employee.component';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './employee.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports: [EmployeeComponent],
    declarations: [EmployeeComponent],
    providers: [EmployeeService],
})
export class EmployeeModule { }
