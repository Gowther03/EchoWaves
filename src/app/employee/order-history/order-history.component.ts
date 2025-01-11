import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orderHistory: any[] = [];
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

  fromDate: string | null = null; // Use string for date format 'YYYY-MM-DD'
  toDate: string | null = null;

  constructor(private orderService: OrdersService, private deliveryAgentService: DeliveryAgentService) { }
  ngOnInit(): void {
    // Fetch the order history from localStorage
    this.orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  }

  filterOrdersByDate(): void {
    if (!this.fromDate || !this.toDate) {
      alert('Please select both From Date and To Date');
      return;
    }

    const userName = localStorage.getItem('userName');
    if (userName) {
      console.log('Filtering orders by date range:', this.fromDate, this.toDate);

      this.orderService
        .getOrdersByDateRange(this.fromDate, this.toDate, this.pageNumber, this.pageSize)
        .subscribe({
          next: (response) => {
            this.orderHistory = response.contents;
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

      onPageChange(newPageNumber: number): void {
        this.pageNumber = newPageNumber;
        this.filterOrdersByDate();
      }
}
