import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],
})
export class ViewOrdersComponent implements OnInit {
  orders: any[] = [];
  deliveryAgents: any[] = [];
  customerDetails: any = null;
  currentAddress:any = null; // Reset current address before showing it again.

  orderDetails: any = null;
  modalTitle: string = '';

  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  pageNumber: number = 0;
  isLastPage: boolean = false;
  pages: number[] = []; // Array for page numbers
  totalAgents = 0;
  selectedAgentId: number | null = null;

  fromDate: string | null = null; // Use string for date format 'YYYY-MM-DD'
  toDate: string | null = null;

  constructor(
    private orderService: OrdersService,
    private deliveryAgentService: DeliveryAgentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllOrders(this.pageNumber, this.pageSize);
    this.fetchDeliveryAgents();
  }


  filterOrdersByDate(): void {
    if (!this.fromDate || !this.toDate) {
      alert('Please select both From Date and To Date');
      return;
    }

    const userName = localStorage.getItem('userName');
    if (userName) {
      console.log('Filtering orders by date range:', this.fromDate, this.toDate);
      console.log('Current page:', this.pageNumber);
      console.log('Page size:', this.pageSize);
      this.orderService
        .getOrdersByDateRange(this.fromDate, this.toDate, this.pageNumber, this.pageSize)
        .subscribe({
          next: (response) => {
            this.orders = response.contents;
            this.totalElements = response.totalElements;
            this.totalPages = response.totalPages;
          },
          error: (err) => {
            console.error('Error filtering orders:', err);
            alert(err.error.message);
          },
        });
    }
  }

  getAllOrders(pageNumber: number, pageSize: number): void {
    this.orderService.getAllOrders(pageNumber, pageSize).subscribe({
      next: (data) => {
        this.orders = data.contents;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.isLastPage = data.last;
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        alert(error.error.message);
      },
    });
  }

  fetchDeliveryAgents(): void {
    this.deliveryAgentService.getAllDeliveryAgents(0,50).subscribe({
      next: (response) => {
        this.deliveryAgents = response.contents;
        this.totalAgents = response.totalElements;
      },
      error: (err) => {
        console.error('Error fetching delivery agents:', err.message);
        alert(err.error.message);
      },
    });
  }

  assignDeliveryAgent(order: any): void {
    if (!this.selectedAgentId) {
      alert('Please select a delivery agent.');
      return;
    }

    this.orderService.assignDeliveryAgent(order.orderId, this.selectedAgentId).subscribe({
      next: () => {
        alert(`Delivery Agent assigned successfully to order ${order.id}.`);
        this.getAllOrders(this.pageNumber, this.pageSize);
        this.selectedAgentId = null;
      },
      error: (error) => {
        console.error('Error assigning delivery agent:', error);
        alert(error.error.message);

      },
    });
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.getAllOrders(this.pageNumber, this.pageSize);
    this.fetchDeliveryAgents();
  }

  openOrderModal(orderId: number): void {
    this.orderService.getOrderDetails(orderId).subscribe({
      next: (data) => {
        this.orderDetails = data;
        const modalElement = document.getElementById('orderDetailsModal');
        const modal = new bootstrap.Modal(modalElement!);
        modal.show();
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
        alert(error.error.message);
      },
    });
  }
  
  openCustomerModal(orderId: number): void {
    this.orderService.getCustomerDetails(orderId).subscribe({
      next: (data) => {
        this.customerDetails = data;
        this.showAddress(orderId);
        const modalElement = document.getElementById('customerDetailsModal');
        const modal = new bootstrap.Modal(modalElement!);
        modal.show();
      },
      error: (error) => {
        console.error('Error fetching customer details:', error);
        alert(error.error.message);
      },
    });
  }

  showAddress(orderId: number): void {
    this.deliveryAgentService.getAddressOfCustomer(orderId).subscribe({
      next: (response) => {
        console.log(response);
        this.currentAddress = response;
      },
      error: (err) => {console.error(err);
        
        alert(err.error.message)
      }
    });
  }

}
