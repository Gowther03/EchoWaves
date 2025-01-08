import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  myToken: string = '';
  role: string = '';

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService, 
    private router: Router
  ) {
    // Initialize the form with validations
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  logIn(): void {
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);
    this.loginService.signIn(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.myToken = response.accessToken;
        localStorage.setItem('token', this.myToken);
        localStorage.setItem('cartId', response.cartId);

        const payload = JSON.parse(atob(this.myToken.split('.')[1]));
        const userRole = payload['role'];
        const userName = payload['sub'];
        localStorage.setItem('userName', userName);

        if (userRole[0].authority === 'ROLE_ADMIN') {
          this.router.navigateByUrl('/AdminDashboard');
        } else if (userRole[0].authority === 'ROLE_CUSTOMER') {
          this.router.navigateByUrl(`/CustomerDashboard/${userName}`);
        } else if (userRole[0].authority === 'ROLE_DELIVERYAGENT') {
          this.router.navigateByUrl('/EmployeeDashboard');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login failed:', err.message);
      },
    });
  }
}
