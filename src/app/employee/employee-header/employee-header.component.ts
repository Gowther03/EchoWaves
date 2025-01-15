import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent {
  constructor(private router: Router, public loginService: LoginService) { }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('picture');
    localStorage.removeItem('cartId');
    this.router.navigateByUrl('/');
  }

  onLogout(): void {
    this.loginService.logout();
    // Additional logout logic if required
  }

  navbarColor = '#b9aedc';  // Default color

  changeColor(color: string) {
    this.navbarColor = color;
  }
}
