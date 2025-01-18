import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  selectedFile: File | null = null;
  isLoading = false; //
  toastMessage = '';
  imagePreviews: string[] = [];

  // Form group with validators
  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    role: new FormControl('ROLE_CUSTOMER', Validators.required),
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    state: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    pinCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{6}$'), // 6-digit pin code validation
    ]),
  });

  constructor(private loginService: LoginService, private router: Router) {}

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
  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
    
    this.imagePreviews = []; 
    const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imagePreviews.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(this.selectedFile as Blob);

  }

  // Handle registration
  registerCustomer() {
    if (this.registerForm.valid && this.selectedFile) {
      
      const email = this.registerForm.value.email;
      this.isLoading = true;
      // Check if email exists
      this.loginService.checkEmail(email).subscribe({
        next: (response) => {
          
          
          // Proceed with registration if email is available
          const formData = new FormData();
          formData.append('userName', this.registerForm.value.userName!);
          formData.append('role', this.registerForm.value.role!);
          formData.append('firstName', this.registerForm.value.firstName!);
          formData.append('lastName', this.registerForm.value.lastName!);
          formData.append('contactNumber', this.registerForm.value.contactNumber!);
          formData.append('email', this.registerForm.value.email!);
          formData.append('password', this.registerForm.value.password!);
          formData.append('city', this.registerForm.value.city!);
          formData.append('state', this.registerForm.value.state!);
          formData.append('pinCode', this.registerForm.value.pinCode!.toString());
          if (this.selectedFile) {
            formData.append('image', this.selectedFile);
          }
  
          this.loginService.register(formData).subscribe({
            next: (response) => {
              
              console.log('Registration successful:', response);
              this.showToast('Registration successful. You can now log in.');
              setTimeout(() => {
                this.router.navigateByUrl('/login');
                this.isLoading = false;
              }, 2000);
              
            },
            error: (err: HttpErrorResponse) => {
              this.isLoading = false;
              console.error('Registration failed:', err.message);
              this.showToast(err.error.message || 'Registration failed. Please try again.');
            },
          });
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Error checking email:', err.status);
          this.showToast(err.error.message || 'Error checking email.');
        }
      });
    } else {
      this.isLoading = false;
      this.showToast('Please fill out the form correctly and upload an image before submitting.');
    }
  }
  
}
