import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 5;

  constructor(private ordersService: OrdersService) {}

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
      },
    });
  }

  onPageChange(page: number): void {
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.fetchOrders(userName, page, this.pageSize);
    }
  }
}
