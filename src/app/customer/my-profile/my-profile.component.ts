
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
        alert(err.error.message);
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
        alert(err.error.message);
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
      alert('No file selected or username missing.');
      return;
    }

    this.customerService.changeProfilePicture(this.userName, this.selectedFile).subscribe({
      next: () => {
        alert('Profile picture updated successfully!');
        location.reload();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error updating profile picture:', err.message);
        alert(err.error.message);
      },
    });
  }
}
