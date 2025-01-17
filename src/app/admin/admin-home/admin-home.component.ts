import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  customers: number = 0;
  products: number = 0;
  orders: number = 0;
  agents: number = 0;
  hotProductsList: any[] = [];
  underStockProducts: any[] = [];

  customerName: string = 'John Doe'; // Replace with dynamic data as needed

  constructor(private router: Router, private cusstomerService: CustomerService) {}
  ngOnInit(): void {
    this.cusstomerService.getAdminDashboardData().subscribe(
            (response) => {
              console.log('Admin Dashboard Data fetched successfully');
              console.log(response);
              
            },
            (error: HttpErrorResponse) => {
              console.error(error.message);
              
            }
          );
  }

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
