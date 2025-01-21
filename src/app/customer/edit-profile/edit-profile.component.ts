import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  updateProfileForm!: FormGroup;
  userName: string | null = localStorage.getItem('userName');
  customer: any = {};
  address: any = {}; // Store fetched customer details
  isLoading: boolean = false; // To handle loading state
  isSuccess: boolean = false; // To show success message
  errorMessage: string = ''; // To show error message
  toastMessage = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userName) {
      this.fetchCustomerDetails(this.userName);
    }

    // Initialize the form
    this.updateProfileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  fetchCustomerDetails(userName: string): void {
    this.isLoading = true;
    this.customerService.fetchCustomerDetails(userName).subscribe({
      next: (response: any) => {
        this.customer = response;
        this.updateProfileForm.patchValue({
          firstName: this.customer.firstName,
          lastName: this.customer.lastName,
          email: this.customer.email,
          contactNumber: this.customer.contactNumber,
        });

        this.customerService.fetchCustomerAddress(this.customer.customerId).subscribe({
          next: (addressResponse: any) => {
            this.address = addressResponse[0];
            console.log(this.address);
            this.updateProfileForm.patchValue({
              city: this.address.city,
              state: this.address.state,
              pinCode: this.address.pinCode,
            });
            this.isLoading = false;
          },
          error: (addressErr: HttpErrorResponse) => {
            console.error('Error fetching customer address:', addressErr.message);
            this.showToast('Error fetching customer address.')
            this.isLoading = false;
          },
        });
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching customer details:', err.message);
        this.showToast(err.error.message)
        this.isLoading = false;
      },
    });
  }

  onUpdateProfile(): void {
    if (this.updateProfileForm.invalid) {
      return;
    }
    this.isLoading = true;
    const updatedData = this.updateProfileForm.value;

    if (this.userName) {
      this.customerService.editProfile(this.userName, updatedData).subscribe({
        next: (response: any) => {
          console.log('Profile updated successfully:', response);
          this.showToast('Profile updated successfully.')
          this.isSuccess = true;
          
          setTimeout(() => {
            location.reload();
            this.isLoading = false;
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating profile:', err.message);
          this.showToast(err.error.message)
          this.isLoading = false;
          this.errorMessage = 'Failed to update profile. Please try again.';
        },
      });
    }
  }

  showToastFlag: boolean = false;

  showToast(message: string) {
    if (!message) return; // Don't show empty messages
    this.toastMessage = message;
    this.showToastFlag = true;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
  closeToast() {
    this.showToastFlag = false;
    this.toastMessage = '';
    const toast = document.getElementById('errorToast');
    if (toast) {
      toast.classList.remove('show');
    }
  }
  
}
