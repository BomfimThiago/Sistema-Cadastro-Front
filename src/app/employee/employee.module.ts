import { NgModule } from '@angular/core';

import { EmployeeComponent } from './employee.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [EmployeeComponent],
    declarations: [EmployeeComponent],
    providers: [],
})
export class EmployeeModule { }
