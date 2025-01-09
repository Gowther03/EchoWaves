import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from 'src/app/services/customer.service';

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
}
