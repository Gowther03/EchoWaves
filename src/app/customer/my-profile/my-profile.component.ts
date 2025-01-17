
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from 'src/app/services/customer.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})

export class MyProfileComponent implements OnInit {

  toastMessage = '';

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
  customer: any = {}; // Store customer details
  addresses: any[] = []; // Store customer addresses
  userName: string | null = localStorage.getItem('userName'); // Get username from localStorage
  customerId: any | null = null; // Store customer ID
  selectedFile: File | null = null; // Store selected file

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    if (this.userName) {
      this.fetchCustomerDetails(this.userName);
    }
  }

  fetchCustomerDetails(userName: string): void {
    this.customerService.fetchCustomerDetails(userName).subscribe({
      next: (response: any) => {
        this.customer = response;
        console.log(response);
        
        this.customerId = response.customerId;
        this.fetchCustomerAddresses(this.customerId);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching customer details:', err.message);
        this.showToast(err.error.message);
      },
    });
  }

  fetchCustomerAddresses(customerId: any): void {
    this.customerService.fetchCustomerAddress(customerId).subscribe({
      next: (response: any) => {
        this.addresses = response;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching customer addresses:', err.message);
        this.showToast(err.error.message);
      },
    });
  }

  openModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('profilePictureModal') as HTMLElement);
    modal.show();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  updateProfilePicture(): void {
    if (!this.selectedFile || !this.userName) {
      this.showToast('No file selected or username missing.');
      return;
    }

    this.customerService.changeProfilePicture(this.userName, this.selectedFile).subscribe({
      next: () => {
        this.showToast('Profile picture updated successfully!');
        location.reload();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error updating profile picture:', err.message);
        this.showToast(err.error.message);
      },
    });
  }
}
