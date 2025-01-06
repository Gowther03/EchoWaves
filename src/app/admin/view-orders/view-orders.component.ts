import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent {
  orders: any[] = []; // Holds the list of orders
  deliveryAgents: any[] = []; // Holds the list of delivery agents

  constructor(
    private orderService: OrdersService,
    private deliveryAgentService: DeliveryAgentService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.getAllOrders();
  //   this.getAllDeliveryAgents();
  // }

  // Fetch all orders
  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // Fetch all delivery agents
  // getAllDeliveryAgents(): void {
  //   this.deliveryAgentService.getAllDeliveryAgents().subscribe(
  //     (data) => {
  //       this.deliveryAgents = data.filter(agent => agent.status === 'unassigned');
  //     },
  //     (error) => {
  //       console.error('Error fetching delivery agents:', error);
  //     }
  //   );
  // }

  // Assign a delivery agent to the order
  assignDeliveryAgent(order: any): void {
    if (this.deliveryAgents.length === 0) {
      alert('No unassigned delivery agents available.');
      return;
    }

    const agent = this.deliveryAgents[0]; // You can choose an agent based on specific logic
    this.orderService.assignDeliveryAgent(order.id, agent.id).subscribe(
      () => {
        alert('Delivery Agent assigned successfully.');
        this.getAllOrders(); // Refresh the orders list
      },
      (error) => {
        console.error('Error assigning delivery agent:', error);
        alert('Failed to assign delivery agent. Please try again.');
      }
    );
  }
}
