import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-delivery-agent',
  templateUrl: './add-delivery-agent.component.html',
  styleUrls: ['./add-delivery-agent.component.css']
})
export class AddDeliveryAgentComponent {
  addAgentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deliveryAgentService: DeliveryAgentService,
    private router: Router
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
      // Log form data for debugging
      console.log('Form data:', this.addAgentForm.value);

      // Call the service to add the delivery agent
      this.deliveryAgentService.addDeliveryAgent(this.addAgentForm.value).subscribe({
        next: (response) => {
          alert('Delivery Agent added successfully!');
          this.router.navigateByUrl('/AdminDashboard/deliveryagentpage');
          
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error adding delivery agent:', err.message);
          alert('Failed to add delivery agent. Please try again.');
        }
      });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}