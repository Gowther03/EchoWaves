import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';

@Component({
  selector: 'app-add-delivery-agent',
  templateUrl: './add-delivery-agent.component.html',
  styleUrls: ['./add-delivery-agent.component.css']
})
export class AddDeliveryAgentComponent 
{
  addAgentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deliveryAgentService: DeliveryAgentService,
    private router: Router
  ) {
    this.addAgentForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  // Handle form submission
  submitForm(): void {
    if (this.addAgentForm.valid) {
      this.deliveryAgentService.addDeliveryAgent(this.addAgentForm.value).subscribe(
        (response) => {
          alert('Delivery Agent added successfully!');
          this.router.navigate(['/admin/delivery-agents']); // Adjust route based on your app structure
        },
        (error) => {
          console.error('Error adding delivery agent:', error);
          alert('Failed to add delivery agent. Please try again.');
        }
      );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }

}
