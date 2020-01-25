import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DepartmentModel } from './department.model';
import { Observable } from 'rxjs';

@Injectable()
export class DepartmentService {

url = `${environment.baseUrl}/department`;

constructor(private http: HttpClient) { }
    getDepartments(): Observable<Array<DepartmentModel>> {
       return this.http.get<Array<DepartmentModel>>(`${this.url}`);
    }
    getDepartmentById(id: string): Observable<DepartmentModel> {
        return this.http.get<DepartmentModel>(`${this.url}/${id}`);
    }
    createDepartment(department: DepartmentModel): Observable<void> {
        return this.http.post<void>(`${this.url}`, department);
    }
    updateDepartment(id: string, department: DepartmentModel): Observable<void> {
        return this.http.put<void>(`${this.url}/${id}`, department);
    }
    deleteDepartment(id: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
