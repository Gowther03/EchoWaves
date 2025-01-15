import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(private router : Router,public loginService: LoginService) { }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('picture');
    localStorage.removeItem('cartId');
    this.router.navigateByUrl('/');
  }

  
  navbarColor = '#b9aedc';  // Default color

  changeColor(color: string) {
      this.navbarColor = color;
  }
  onLogout(): void {
    this.loginService.logout();
    // Additional logout logic if required
  }
}
