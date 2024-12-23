import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {


  customerName: string = 'John Doe'; // Replace with dynamic data as needed

  constructor(private router: Router) {}

  navigateToAddEmployee() {
    this.router.navigateByUrl('/AdminDashboard/AddEmployee');
  }

  
  navigateToViewEmployees(){
    this.router.navigateByUrl('/AdminDashboard/Employees');
  }
  navigateToViewCustomers() {
    this.router.navigateByUrl('/AdminDashboard/Customers');
  }
}
