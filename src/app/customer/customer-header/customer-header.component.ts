import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent {

  picture = localStorage.getItem('picture');
  userName = localStorage.getItem('userName');

  searchForm: FormGroup;
constructor(private router : Router,public loginService: LoginService, private fb: FormBuilder) { 
  this.searchForm = this.fb.group({
    searchQuery: ['']  // Initialize searchQuery form control
  });
}
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
    
  onSearch(): void {
    const searchQuery = this.searchForm.get('searchQuery')?.value;
    if (searchQuery) {
      this.router.navigate(['CustomerDashboard/:userName/search'], { queryParams: { query: searchQuery } });
    }
  }
}
