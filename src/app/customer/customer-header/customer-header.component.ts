import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent {

constructor(private router : Router,public loginService: LoginService) { }
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  

  onLogout(): void {
    this.loginService.logout();
    // Additional logout logic if required
  }

  navigateToMensSection(): void {
    this.router.navigateByUrl('/CustomerDashboard/mensSection');
  }

  navbarColor = '#b9aedc';  // Default color

    changeColor(color: string) {
        this.navbarColor = color;
    }
}
