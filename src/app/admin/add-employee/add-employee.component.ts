import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  toastMessage = '';

constructor(private employeeService: EmployeeService, private router: Router) { }

  
  registerForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('ROLE_EMPLOYEE'),
    employeeName: new FormControl(''),
    salary: new FormControl(''),
    city: new FormControl
  });
  myToken: any = "";
  role: any = "";




  registerEmployee() {
      //hit service
      this.employeeService.addEmployee(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigateByUrl('/');
          // this.myToken = response.accessToken//local level
          // console.log(this.myToken)
          // localStorage.setItem('token', this.myToken);
          // const payload = JSON.parse(atob(this.myToken.split('.')[1]));
          // console.log(payload)
          // const userRole = payload['role'];
          // console.log(userRole[0].authority);
          // if (userRole[0].authority === 'ROLE_ADMIN') {
          //   this.router.navigateByUrl('/adminDashboard');
          // } else if (userRole[0].authority === 'ROLE_CUSTOMER') {
          //   this.router.navigateByUrl('/userDashboard');
          // }else if (userRole[0].authority === 'ROLE_EMPLOYEE') {
          //   this.router.navigateByUrl('/employeeDashboard');
          // }
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err)
          this.showToast(err.error.message);
        }
      });

  }

  showToast(message: string) {
    this.toastMessage = message;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}
