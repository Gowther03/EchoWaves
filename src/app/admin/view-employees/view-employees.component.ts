import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent {

  employees: any = "";
  
    constructor(private employeeService: EmployeeService, private router: Router) { 
      employeeService.getAllEmployees().subscribe({
        next: (response) => {
          this.employees = response;
          console.log(this.employees);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
      }
}
