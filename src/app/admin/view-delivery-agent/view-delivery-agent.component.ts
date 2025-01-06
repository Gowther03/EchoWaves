import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';

@Component({
  selector: 'app-view-delivery-agent',
  templateUrl: './view-delivery-agent.component.html',
  styleUrls: ['./view-delivery-agent.component.css'],
})
export class ViewDeliveryAgentComponent implements OnInit {
  deliveryAgents: any[] = []; // Holds the list of delivery agents
  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 3;
  pageNumber: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];

  constructor(private deliveryAgentService: DeliveryAgentService) {}

  ngOnInit(): void {
    this.fetchDeliveryAgents(this.pageNumber, this.pageSize);
  }

  // Fetch paginated delivery agents
  fetchDeliveryAgents(pageNumber: number, pageSize: number): void {
    this.deliveryAgentService.getAllDeliveryAgents(pageNumber, pageSize).subscribe({
      next: (response) => {
        this.deliveryAgents = response.contents;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching delivery agents:', err.message);
      },
    });
  }

  // Delete an agent
  deleteAgent(agentId: any): void {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.deliveryAgentService.deleteDeliveryAgent(agentId).subscribe({
        next: () => {
          alert('Agent deleted successfully!');
          this.fetchDeliveryAgents(this.pageNumber, this.pageSize); // Refresh the list
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting agent:', err.message);
        },
      });
    }
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchDeliveryAgents(this.pageNumber, this.pageSize);
  }
}
