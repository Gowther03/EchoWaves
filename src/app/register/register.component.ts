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
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
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
      formData.append('image', this.selectedFile);

      this.loginService.register(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigateByUrl('/');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Registration failed:', err.message);
          alert('Registration failed. Please try again.');
        },
      });
    } else {
      alert('Please fill out the form correctly and upload an image before submitting.');
    }
  }
}
