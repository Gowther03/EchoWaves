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
  
  orders = [
    {
      orderId: 'ORD001',
      customerName: 'John Doe',
      customerContact: '1234567890',
      deliveryAddress: '123 Main St, Cityville',
      amount: 150.0,
      paymentStatus: 'Paid',
      lastOrderStatus: 'Shipped',
      delivered: false
    },
    {
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      customerContact: '9876543210',
      deliveryAddress: '456 Elm St, Townsville',
      amount: 200.0,
      paymentStatus: 'Pending',
      lastOrderStatus: 'Processing',
      delivered: false
    },
    // Add more sample orders as needed
  ];

  markAsDelivered(order: any): void {
    // Remove the order from the current list
    this.orders = this.orders.filter(o => o !== order);

    // Store the delivered order in localStorage for the Order History page
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }
}
