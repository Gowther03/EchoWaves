import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-delivery-agent',
  templateUrl: './add-delivery-agent.component.html',
  styleUrls: ['./add-delivery-agent.component.css']
})
export class AddDeliveryAgentComponent {
  isLoading = false; //
  toastMessage = '';
  addAgentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deliveryAgentService: DeliveryAgentService,
    private router: Router,
    private loginService: LoginService
  ) {
    // Initialize the form with validation
    this.addAgentForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      agentName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ROLE_DELIVERYAGENT'] // Pre-set the role as ROLE_DELIVERYAGENT
    });
  }

  ngOnInit(): void {}

  // Handle form submission
  submitForm(): void {
    if (this.addAgentForm.valid) {
      this.isLoading = true;
      // Log form data for debugging
      console.log('Form data:', this.addAgentForm.value);
      const email = this.addAgentForm.value.email;
      this.deliveryAgentService.checkEmail(email).subscribe({
        next: (response) => {
          this.deliveryAgentService.addDeliveryAgent(this.addAgentForm.value).subscribe({
            next: (response) => {
              
              this.showToast('Delivery Agent added successfully!');
              setTimeout(() => {
                this.router.navigateByUrl('/AdminDashboard/deliveryagentpage');
                this.isLoading = false;
              }, 2000);
              
              
            },
            error: (err: HttpErrorResponse) => {
              this.isLoading = false;
              console.error('Error adding delivery agent:', err.message);
              this.showToast(err.error.message);
            }
          });
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Error checking email:', err.status);
          this.showToast(err.error.message);
        }
      });
      // Call the service to add the delivery agent
      } else {
        
      alert('Please fill out all fields correctly.');
    }
  }

  closeToast() {
    const toast = document.getElementById('errorToast');
    if (toast) {
      toast.classList.remove('show'); // Hide the toast
    }
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