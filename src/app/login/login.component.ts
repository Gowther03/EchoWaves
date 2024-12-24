import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
constructor(private loginService: LoginService, private router: Router) { }

  
  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });
  myToken: any = "";
  role: any = "";




  logIn() {
      console.log(this.loginForm.value);
      this.loginService.signIn(this.loginForm.value).subscribe({
        next: (response) => {
          this.myToken = response.accessToken//local level
          console.log(this.myToken)
          localStorage.setItem('token', this.myToken);
          const payload = JSON.parse(atob(this.myToken.split('.')[1]));
          console.log(payload)
          const userRole = payload['role'];
          console.log(userRole[0].authority);

          const userName = payload['sub'];
          localStorage.setItem('userName', userName);
          console.log(userName);
          if (userRole[0].authority === 'ROLE_ADMIN') {
            this.router.navigateByUrl('/AdminDashboard');
          } else if (userRole[0].authority === 'ROLE_CUSTOMER') {
            this.router.navigateByUrl('/CustomerDashboard/${userName}');
          }else if (userRole[0].authority === 'ROLE_EMPLOYEE') {
            this.router.navigateByUrl('/EmployeeDashboard');
          }
        },
        error:(err:HttpErrorResponse)=>{}
      });

  }
}
