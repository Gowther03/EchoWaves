import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
customerName: string = 'John Doe';

  constructor(private router: Router) {}

  navigateToViewCustomers() {
    this.router.navigateByUrl('/EmployeeDashboard/ViewCustomers');
  }
}
