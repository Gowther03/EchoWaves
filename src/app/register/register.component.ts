import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

constructor(private loginService: LoginService, private router: Router) { }

  
  registerForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('ROLE_CUSTOMER'),
    contact: new FormControl(''),
    customerName: new FormControl(''),
  });
  myToken: any = "";
  role: any = "";




  registerCustomer() {
      //hit service
      this.loginService.register(this.registerForm.value).subscribe({
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
        error:(err:HttpErrorResponse)=>{}
      });

  }

}
