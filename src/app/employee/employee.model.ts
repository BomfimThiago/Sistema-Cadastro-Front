import { DepartmentModel } from '../department/department.model';

export class EmployeeModel {
    id: string;
    name: string;
    contact: string;
    cpf: string;
    email: string;
    age: number;
    joinDate: Date;
    resignedDate?: Date;
    departmentId: string;
    department: DepartmentModel;
}
