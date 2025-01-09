import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  selectedFile: File | null = null;

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

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  // Handle registration
  registerCustomer() {
    if (this.registerForm.valid && this.selectedFile) {
      const email = this.registerForm.value.email;
  
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
              this.router.navigateByUrl('/');
            },
            error: (err: HttpErrorResponse) => {
              console.error('Registration failed:', err.message);
              alert(err.error.message);
            },
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error checking email:', err.status);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please fill out the form correctly and upload an image before submitting.');
    }
  }
  
}
