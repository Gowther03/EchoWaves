import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  customerName: string = 'John Doe';

  constructor(private router: Router) {}

  navigateToEditProfile() {
    this.router.navigateByUrl('/CustomerDashboard/:userName/EditProfile');
  }
}
