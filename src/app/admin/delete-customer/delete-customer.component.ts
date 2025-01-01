import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent
 {
  customerId: string | null = null; // Holds the customer ID from the route
  customer: any = null; // Holds customer details for confirmation

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    // Get the customer ID from the route
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.loadCustomerDetails(this.customerId);
    }
  }

  // Fetch customer details for confirmation
  loadCustomerDetails(id: string): void {
    this.customerService.getCustomerById(id).subscribe(
      (data) => {
        this.customer = data;
      },
      (error) => {
        console.error('Error fetching customer details:', error);
      }
    );
  }

  // Delete the customer
  deleteCustomer(): void {
    if (this.customerId) {
      this.customerService.deleteCustomerById(this.customerId).subscribe(
        () => {
          alert('Customer deleted successfully.');
          this.router.navigate(['/admin/customers']); // Redirect to customer list
        },
        (error) => {
          console.error('Error deleting customer:', error);
          alert('Failed to delete customer. Please try again.');
        }
      );
    }
  }

  // Cancel and navigate back to the customer list
  cancel(): void {
    this.router.navigate(['/admin/customers']);
  }

}
