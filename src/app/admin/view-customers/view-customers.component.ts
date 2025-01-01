import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent {
  customers: any = "";

  constructor(private customerService: CustomerService, private router: Router) { 
    customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.customers = response;
        console.log(this.customers);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
    }

    
}
