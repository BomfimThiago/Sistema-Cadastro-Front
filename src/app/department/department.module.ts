import { NgModule } from '@angular/core';

import { DepartmentComponent } from './department.component';
import { DepartmentService } from './department.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [DepartmentComponent],
    exports: [DepartmentComponent],
    providers: [DepartmentService],
})
export class DepartmentModule { }
