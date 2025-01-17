import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-view-delivery-agent',
  templateUrl: './view-delivery-agent.component.html',
  styleUrls: ['./view-delivery-agent.component.css'],
})
export class ViewDeliveryAgentComponent implements OnInit {
  deliveryAgents: any[] = []; // Holds the list of delivery agents
  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 5;
  pageNumber: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];
  toastMessage = '';
  searchForm: FormGroup;

  constructor(private deliveryAgentService: DeliveryAgentService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['']  // Initialize searchQuery form control
    });
  }

  onSearch(): void {
    const searchQuery = this.searchForm.get('searchQuery')?.value;
    if (searchQuery) {
      this.deliveryAgentService.getAllDeliveryAgents(this.pageNumber, this.pageSize).subscribe(response => {
        if (response && response.contents) {
          const lowerCaseQuery = searchQuery.toLowerCase();
          this.deliveryAgents = response.contents.filter((agent: any) => {
            return (
              agent?.agentName.toLowerCase().includes(lowerCaseQuery) ||
              agent?.city?.toLowerCase().includes(lowerCaseQuery) ||
              agent?.email?.toLowerCase().includes(lowerCaseQuery)
            );
          });
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
          this.isLastPage = response.last;
          this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
        } else {
          console.error('Invalid response format:', response);
          this.showToast('Error fetching products. Please try again later.');
          this.deliveryAgents = []; // Handle empty or invalid responses
        }
      }, error => {
        console.error('Error fetching products:', error);
        this.showToast('Error fetching products. Please try again later.');
        this.deliveryAgents = []; // Clear products in case of an error
      });
    }
  }

  closeToast() {
    const toast = document.getElementById('errorToast');
    if (toast) {
      toast.classList.remove('show'); // Hide the toast
    }
  }
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
        this.showToast(err.error.message);
      },
    });
  }

  // Delete an agent
  deleteAgent(agentId: any): void {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.deliveryAgentService.deleteDeliveryAgent(agentId).subscribe({
        next: () => {
          this.showToast('Agent deleted successfully!');
          this.fetchDeliveryAgents(this.pageNumber, this.pageSize); // Refresh the list
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting agent:', err.message);
          this.showToast(err.error.message);
        },
      });
    }
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchDeliveryAgents(this.pageNumber, this.pageSize);
  }

  showToast(message: string) {
    this.toastMessage = message;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}
