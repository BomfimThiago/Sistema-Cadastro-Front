import { NgModule } from '@angular/core';

import { DepartmentComponent } from './department.component';
import { DepartmentService } from './department.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        RouterModule
    ],
    declarations: [DepartmentComponent, DepartmentDetailsComponent],
    exports: [DepartmentComponent, DepartmentDetailsComponent],
    providers: [DepartmentService],
})
export class DepartmentModule { }
