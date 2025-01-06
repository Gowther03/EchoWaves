import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  orderDetails: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.orderDetails = navigation?.extras.state?.['orderDetails'];
  }
}
