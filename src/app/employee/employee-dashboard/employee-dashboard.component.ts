import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {

  orders: any[] = [];
  customerDetails: any = null;
  currentAddress:any = null;
  toastMessage = ''; // Reset current address before showing it again.

  orderDetails: any = null;
  modalTitle: string = '';
  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  pageNumber: number = 0;
  isLastPage: boolean = false;
  pages: number[] = []; // Array for page numbers
  totalAgents = 0;
  selectedStatuses: { [orderId: number]: string } = {};

  fromDate: string | null = null; // Use string for date format 'YYYY-MM-DD'
  toDate: string | null = null;
  today = new Date().toISOString().split('T')[0];  // For date input max value
  constructor(private deliveryAgentService: DeliveryAgentService,
    private orderService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.loadOrders(this.pageNumber, this.pageSize);
  }

  loadOrders(pageNumber: number, pageSize: number): void {
    const userName = localStorage.getItem('userName');
    this.deliveryAgentService
      .getOrdersOfAgent(userName, pageNumber, pageSize)
      .subscribe({
        next: (response) => {
          this.orders = response.contents;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
        },
        error: (err) =>{
          console.error(err);
          this.showToast(err.error.message || 'Error');
        } 
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
            this.showToast(err.error.message || 'Error filtering orders');
          },
        });
    }
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.loadOrders(this.pageNumber, this.pageSize);
  }

  selectStatus(orderId: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const status = target.value;
    this.selectedStatuses[orderId] = status;
  }
  

  updateOrderStatus(orderId: number): void {
    const status = this.selectedStatuses[orderId];
    if (!status) {

      this.showToast('Please select a status to update.');
      return;
    }

    this.deliveryAgentService.changeStatus(orderId, status).subscribe({
      next: () => {
        alert(`Order ${orderId} updated to ${status}.`);
        this.loadOrders(this.pageNumber, this.pageSize);
      },
      error: (err) => {
        console.error(err);
        this.showToast(err.error.message || 'Error');
      }
    });
  }
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

  markAsDelivered(order: any): void {
    this.deliveryAgentService.changeStatus(order.orderId, 'delivered').subscribe({
      next: () => {
        alert(`Order ${order.orderId} marked as delivered.`);
        this.orders = this.orders.filter((o) => o !== order);

        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        orderHistory.push(order);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      },
      error: (err) => {console.error(err);
        this.showToast(err.error.message || 'Error');
      }
    });
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
          this.showToast(error.error.message || 'Error');
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
          this.showToast(error.error.message || 'Error');
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
          
          this.showToast(err.error.message || 'Error');
        }
      });
    }
}
