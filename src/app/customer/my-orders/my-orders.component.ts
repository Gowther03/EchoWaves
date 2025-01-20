import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CustomerService } from 'src/app/services/customer.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {

  toastMessage = '';
  today = new Date().toISOString().split('T')[0];  // For date input max value

  showToast(message: string) {
    this.toastMessage = message;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }

  closeToast() {
    const toast = document.getElementById('errorToast');
    if (toast) {
      toast.classList.remove('show'); // Hide the toast
    }
  }
  orders: any[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 3;
  fromDate: string | null = null; // Use string for date format 'YYYY-MM-DD'
  toDate: string | null = null;

  constructor(private ordersService: OrdersService, private customerService: CustomerService) {}

  ngOnInit(): void {
    const userName = localStorage.getItem('userName'); // Retrieve username from localStorage
    if (userName) {
      this.fetchOrders(userName, this.currentPage, this.pageSize);
    }
  }

  fetchOrders(userName: string, pageNumber: number, pageSize: number): void {
    this.ordersService.getOrdersOfCustomer(userName, pageNumber, pageSize).subscribe({
      next: (response) => {
        this.orders = response.contents;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.currentPage = pageNumber;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.showToast(err.error.message);},
    });
  }

  filterOrdersByDate(): void {
    if (!this.fromDate || !this.toDate) {
      this.showToast('Please select both From Date and To Date');
      return;
    }

    const userName = localStorage.getItem('userName');
    if (userName) {
      console.log('Filtering orders by date range:', this.fromDate, this.toDate);
      console.log('Current page:', this.currentPage);
      console.log('Page size:', this.pageSize);
      this.customerService
        .getOrdersByDateRange(userName, this.fromDate, this.toDate, this.currentPage, this.pageSize)
        .subscribe({
          next: (response) => {
            this.orders = response.contents;
            this.totalElements = response.totalElements;
            this.totalPages = response.totalPages;
          },
          error: (err) => {
            console.error('Error filtering orders:', err);
            this.showToast(err.error.message);},
        });
    }
  }

  onPageChange(page: number): void {
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.fetchOrders(userName, page, this.pageSize);
    }
  }
}
