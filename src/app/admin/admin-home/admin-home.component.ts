import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDashboardData } from 'src/app/models/admin-dashboard-data';
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
  totalStock: number = 0;
  hotProducts: number = 0;
  unassigned: number = 0;
  delivered: number = 0;
  totalRevenue: number = 0;
  hotProductsList: any[] = [];
  underStockProducts: any[] = [];

  customerName: string = 'John Doe'; // Replace with dynamic data as needed

  constructor(private router: Router, private cusstomerService: CustomerService) {}
  ngOnInit(): void {
    this.cusstomerService.getAdminDashboardData().subscribe(
                (response: any) => {
              console.log('Admin Dashboard Data fetched successfully');
              console.log(response);
              this.customers = response.customers;
              this.products = response.products;
              this.orders = response.orders;
              this.agents = response.agents;
              this.totalStock = response.totalStock;
              this.hotProducts = response.hotProducts;
              this.unassigned = response.unassigned;
              this.delivered = response.delivered;
              this.totalRevenue = response.totalRevenue;
              this.hotProductsList = response.hotProductsList;
              this.underStockProducts = response.underStockProducts;
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
