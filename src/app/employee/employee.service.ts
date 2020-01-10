import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from './employee.model';

@Injectable()
export class EmployeeService {

  url = `${environment.baseUrl}/employee`;

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<Array<EmployeeModel>>(this.url);
  }
  getEmployeeById(id: string){
    return this.http.get<EmployeeModel>(`${this.url}/${id}`);
  }
  getEmployeesBySearch(q: string, departmentId?: string) {
    return this.http.get<Array<EmployeeModel>>
    (`${this.url}/search?q=${q}&departmentId=${departmentId}`);
  }
  getEmployeesByDepartmentId(departmentId: string) {
    return this.http.get<Array<EmployeeModel>>(`${this.url}/search/${departmentId}`);
  }

}
