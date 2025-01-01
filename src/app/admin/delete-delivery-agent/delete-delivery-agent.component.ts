import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';

@Component({
  selector: 'app-delete-delivery-agent',
  templateUrl: './delete-delivery-agent.component.html',
  styleUrls: ['./delete-delivery-agent.component.css']
})
export class DeleteDeliveryAgentComponent {
  agentId: string = '';

  constructor(
    private deliveryAgentService: DeliveryAgentService,
    private router: Router
  ) {}

  // Delete the delivery agent
  deleteAgent(): void {
    if (this.agentId.trim() === '') {
      alert('Please enter a valid Delivery Agent ID.');
      return;
    }

    if (confirm('Are you sure you want to delete this delivery agent?')) {
      this.deliveryAgentService.deleteDeliveryAgent(this.agentId).subscribe(
        () => {
          alert('Delivery Agent deleted successfully!');
          this.router.navigate(['/admin/view-delivery-agents']); // Navigate back to the view page
        },
        (error) => {
          console.error('Error deleting delivery agent:', error);
          alert('Failed to delete delivery agent. Please try again.');
        }
      );
    }
  }
}
