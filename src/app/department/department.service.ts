import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DepartmentModel } from './department.model';

@Injectable()
export class DepartmentService {

url = `${environment.baseUrl}/department`

constructor(private http: HttpClient) { }
    getDepartments() {
       return this.http.get<Array<DepartmentModel>>(`${this.url}`);
    }

    getDepartmentById(id: string){
        return this.http.get<DepartmentModel>(`${this.url}/${id}`);
    }
}
