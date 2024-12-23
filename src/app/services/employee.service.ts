import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getAllEmployeesUrl = "http://localhost:8080/practiceApp/employees";
  addEmployeeUrl = "http://localhost:8080/practiceApp/employees";
     constructor(private http: HttpClient) { }
    
    getAllEmployees(){
      return this.http.get(this.getAllEmployeesUrl);
    }

    addEmployee(employeeData: any){
      return this.http.post(this.addEmployeeUrl, employeeData);
    }
}
