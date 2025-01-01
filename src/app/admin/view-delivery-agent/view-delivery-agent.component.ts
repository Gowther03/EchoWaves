import { Component } from '@angular/core';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';

@Component({
  selector: 'app-view-delivery-agent',
  templateUrl: './view-delivery-agent.component.html',
  styleUrls: ['./view-delivery-agent.component.css']
})
export class ViewDeliveryAgentComponent {
  deliveryAgents: any[] = []; // Holds the list of delivery agents

  constructor(private deliveryAgentService: DeliveryAgentService) {}

  ngOnInit(): void {
    this.getAllDeliveryAgents();
  }

  // Fetch all delivery agents
  getAllDeliveryAgents(): void {
    this.deliveryAgentService.getAllDeliveryAgents().subscribe(
      (data) => {
        this.deliveryAgents = data;
      },
      (error) => {
        console.error('Error fetching delivery agents:', error);
      }
    );
  }

  // View agent details (can be expanded to navigate to a detailed page)
  viewAgent(agent: any): void {
    alert(`Details of ${agent.name}:\nContact: ${agent.contact}\nEmail: ${agent.email}`);
  }

  // Delete an agent
  deleteAgent(id: string): void {
    if (confirm('Are you sure you want to delete this delivery agent?')) {
      this.deliveryAgentService.deleteDeliveryAgent(id).subscribe(
        () => {
          alert('Delivery Agent deleted successfully.');
          this.getAllDeliveryAgents(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting delivery agent:', error);
          alert('Failed to delete delivery agent. Please try again.');
        }
      );
    }
  }
}
