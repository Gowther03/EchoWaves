import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],
})
export class ViewOrdersComponent implements OnInit {
  orders: any[] = [];
  deliveryAgents: any[] = [];
  currentPage = 1;
  pageSize = 5;
  totalAgents = 0;
  selectedAgentId: number | null = null;

  constructor(
    private orderService: OrdersService,
    private deliveryAgentService: DeliveryAgentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
    this.fetchDeliveryAgents(this.currentPage);
  }

  getAllOrders(): void {
    this.orderService.getAllOrders(0, 10).subscribe({
      next: (data) => {
        this.orders = data.contents;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  fetchDeliveryAgents(pageNumber: number): void {
    this.deliveryAgentService.getAllDeliveryAgents(pageNumber - 1, this.pageSize).subscribe({
      next: (response) => {
        this.deliveryAgents = response.contents;
        this.totalAgents = response.totalElements;
      },
      error: (err) => {
        console.error('Error fetching delivery agents:', err.message);
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
        this.getAllOrders();
        this.selectedAgentId = null;
      },
      error: (error) => {
        console.error('Error assigning delivery agent:', error);
        alert('Failed to assign delivery agent. Please try again.');
      },
    });
  }

  onPageChange(newPageNumber: number): void {
    this.currentPage = newPageNumber;
    this.fetchDeliveryAgents(this.currentPage);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalAgents / this.pageSize);
  }
}
