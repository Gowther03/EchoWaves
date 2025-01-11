import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  captcha: string = ''; // Stores the generated CAPTCHA
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    captcha: new FormControl('', Validators.required)
  });
  myToken: string = '';
  role: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  // Generate CAPTCHA
  generateCaptcha(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = '';
    for (let i = 0; i < 6; i++) {
      const char = characters.charAt(Math.floor(Math.random() * characters.length));
      this.captcha += char;
    }

    const textColors = ['rgb(0,0,0)', 'rgb(0, 0, 0)'];
    const letterSpace = 150 / this.captcha.length;

    for (let i = 0; i < this.captcha.length; i++) {
      ctx.font = '20px Roboto Mono';
      ctx.fillStyle = textColors[Math.floor(Math.random() * textColors.length)];
      ctx.fillText(
        this.captcha[i],
        25 + i * letterSpace,
        Math.floor(Math.random() * (40 - 25 + 1) + 25)
      );
    }
  }


  // Handle login logic
  logIn(): void {
    const captchaInput = this.loginForm.get('captcha')?.value;

    if (captchaInput !== this.captcha) {
      alert('Invalid CAPTCHA! Please try again.');
      this.generateCaptcha(); // Refresh CAPTCHA
      this.loginForm.get('captcha')?.reset();
      return;
    }

    this.loginService.signIn(this.loginForm.value).subscribe({
      next: (response) => {
        this.myToken = response.accessToken;
        localStorage.setItem('token', this.myToken);
        localStorage.setItem('cartId', response.cartId);
        localStorage.setItem('picture', response.profileImage);

        const payload = JSON.parse(atob(this.myToken.split('.')[1]));
        const userRole = payload['role'][0].authority;
        const userName = payload['sub'];

        localStorage.setItem('userName', userName);
        alert('Login successful!');
        if (userRole === 'ROLE_ADMIN') {
          this.router.navigateByUrl('/AdminDashboard');
        } else if (userRole === 'ROLE_CUSTOMER') {
          this.router.navigateByUrl(`/CustomerDashboard/${userName}`);
        } else if (userRole === 'ROLE_DELIVERYAGENT') {
          this.router.navigateByUrl('/EmployeeDashboard');
        }
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message);
      }
    });
  }
}
