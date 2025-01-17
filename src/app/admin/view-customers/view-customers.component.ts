import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {

  customers: any[] = []; // Store customer list
  addressMap: { [key: number]: any } = {}; // Store addresses mapped by customer ID
  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 3;
  pageNumber: number = 0;
  isLastPage: boolean = false;
  pages: number[] = []; // Array for page numbers
  searchForm: FormGroup;

  toastMessage = '';
  customerDetails: any = null;
  currentAddress: any = []; // Reset current address before showing it again.
  modalTitle: string = '';

  constructor(private customerService: CustomerService, private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['']  // Initialize searchQuery form control
    });
  }

  ngOnInit(): void {
    this.fetchCustomers(this.pageNumber, this.pageSize);
  }

  fetchAddress(customerId: number): void {
    if (this.addressMap[customerId]) {
      // Toggle visibility off if the address is already fetched
      delete this.addressMap[customerId];
      return;
    }
  
    this.customerService.fetchCustomerAddress(customerId).subscribe({
      next: (response) => {
        console.log('Fetched Address:', response); // Debugging
        this.addressMap[customerId] = response; // Store the address by customerId
        console.log('Address Map:', this.addressMap); // Debugging
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching customer address:', err.message);
        this.showToast(err.error.message);
      }
    });
  }
  

  fetchCustomers(pageNumber: number, pageSize: number): void {
    this.customerService.getAllCustomers(pageNumber, pageSize).subscribe({
      next: (response) => {
        this.customers = response.contents;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching customers:', err.message);
        this.showToast(err.error.message);
      }
    });
  }

  
  deleteCustomer(customerId: any) {
    if (!confirm('Are you sure you want to delete this customer?')) {
      return;
    }
    this.customerService.deleteCustomerById(customerId).subscribe({
      next: () => {
        this.showToast('Customer deleted successfully!'); // Debugging
        this.fetchCustomers(this.pageNumber, this.pageSize);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error deleting customer:', err.message);
        this.showToast(err.error.message);
      }
    });
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchCustomers(this.pageNumber, this.pageSize);
  }


  onSearch(): void {
    const searchQuery = this.searchForm.get('searchQuery')?.value;
    if (searchQuery) {
      this.customerService.getAllCustomers(this.pageNumber, this.pageSize).subscribe({
        next: (response) => {
          const lowerCaseQuery = searchQuery.toLowerCase();
          this.customers = response.contents.filter((customer: any) => {
            return (
              customer?.firstName?.toLowerCase().includes(lowerCaseQuery) ||
              customer?.lastName?.toLowerCase().includes(lowerCaseQuery) ||
              customer?.email?.toLowerCase().includes(lowerCaseQuery) ||
              customer?.contactNumber?.toLowerCase().includes(lowerCaseQuery)
            );
          });;
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
          this.isLastPage = response.last;
          this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching products:', err.message);
          this.showToast(err.error.message);
        },
      });
    }
  }

  openCustomerModal(customerId: number): void {
      this.customerService.getCustomerById(customerId).subscribe({
        next: (data) => {
          this.customerDetails = data;
          this.showAddress(customerId);
          const modalElement = document.getElementById('customerDetailsModal');
          const modal = new bootstrap.Modal(modalElement!);
          modal.show();
        },
        error: (error) => {
          console.error('Error fetching customer details:', error);
          this.showToast(error.error.message || 'Error fetching customer details');
        },
      });
    }
  
    showAddress(customerId: number): void {
      this.customerService.fetchCustomerAddress(customerId).subscribe({
        next: (response) => {
          console.log(response);
          this.currentAddress = response;
        },
        error: (err) => {console.error(err);
          
          this.showToast(err.error.message)
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
}
