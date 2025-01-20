import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  orderDetails: any;
  currentAddress:any = null;
  constructor(private router: Router, private deliveryAgentService: DeliveryAgentService) {
    const navigation = this.router.getCurrentNavigation();
    this.orderDetails = navigation?.extras.state?.['orderDetails'];
    this.deliveryAgentService.getAddressOfCustomer(this.orderDetails.orderId).subscribe({
      next: (response) => {
        console.log(response);
        this.currentAddress = response;
      },
      error: (err) => {console.error(err);
        
        alert(err.error.message || 'Error');
      }
    });
  }
}
