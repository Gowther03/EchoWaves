import { Component, OnInit } from '@angular/core';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  orders: any[] = [];
  currentAddress: any | null = null;
  pageNumber: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  selectedStatuses: { [orderId: number]: string } = {};

  constructor(private deliveryAgentService: DeliveryAgentService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userName = localStorage.getItem('userName');
    this.deliveryAgentService
      .getOrdersOfAgent(userName, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          this.orders = response.contents;
          this.totalPages = response.totalPages;
        },
        error: (err) => console.error(err),
      });
  }

  goToPage(page: number): void {
    this.pageNumber = page;
    this.loadOrders();
  }

  selectStatus(orderId: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const status = target.value;
    this.selectedStatuses[orderId] = status;
  }
  

  updateOrderStatus(orderId: number): void {
    const status = this.selectedStatuses[orderId];
    if (!status) {
      alert('Please select a status to update.');
      return;
    }

    this.deliveryAgentService.changeStatus(orderId, status).subscribe({
      next: () => {
        alert(`Order ${orderId} updated to ${status}.`);
        this.loadOrders();
      },
      error: (err) => console.error(err),
    });
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
      error: (err) => console.error(err),
    });
  }

  showAddress(orderId: number): void {
    this.deliveryAgentService.getAddressOfCustomer(orderId).subscribe({
      next: (response) => {
        this.currentAddress = { ...response, orderId };
      },
      error: (err) => console.error(err),
    });
  }
}
