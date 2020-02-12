import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from './employee.model';
import { Observable } from 'rxjs';
import { EmployeeCadastroModel } from './employee.cadastro.model';

@Injectable()
export class EmployeeService {
  url = `${environment.baseUrl}/employee`;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Array<EmployeeModel>> {
    return this.http.get<Array<EmployeeModel>>(this.url);
  }
  getEmployeeById(id: string): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${this.url}/${id}`);
  }
  createEmployee(employee: EmployeeCadastroModel): Observable<void> {
    return this.http.post<void>(`${this.url}`, employee);
  }
  updateEmployee(id: string, employee: EmployeeModel): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, employee);
  }
  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getEmployeesBySearch(q: string, departmentId?: string): Observable<Array<EmployeeModel>> {
    return this.http.get<Array<EmployeeModel>>(`${this.url}/search?q=${q}&departmentId=${departmentId}`);
  }
  getEmployeesByDepartmentId(departmentId: string): Observable<Array<EmployeeModel>> {
    return this.http.get<Array<EmployeeModel>>(`${this.url}/search/${departmentId}`);
  }
}
