import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

interface CustomWindow extends Window {
  paypal: any;  // Define the type for paypal as 'any' or more specific if required
}

declare let window: CustomWindow;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalAmount: number;
  orderDetails: any;

  constructor(
    private router: Router,
    private ordersService: OrdersService
  ) {
    // Capture the total amount and order details passed from CartComponent
    const navigationState = history.state;
    this.totalAmount = navigationState.totalAmount;
    this.orderDetails = navigationState.orderDetails;
  }

  ngOnInit(): void {
    // PayPal button initialization will be done here
    this.initializePayPalButton();
  }

  initializePayPalButton(): void {
    // Add your PayPal client ID here
    const clientId = 'your-client-id'; // Replace with your PayPal client ID

    // Create the PayPal button dynamically
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.totalAmount.toFixed(2) // Ensure the amount is formatted to two decimal places
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            // Handle the successful payment here
            console.log('Payment successful:', details);

            // Place the order on the backend
            const cartId = localStorage.getItem('cartId');
            const userName = localStorage.getItem('userName');
            this.ordersService.placeOrder(cartId, userName).subscribe({
              next: (response) => {
                console.log('Order placed successfully:', response);
                // After the order is successfully placed, navigate to the order confirmation page
                this.router.navigate([`/CustomerDashboard/${userName}/order-confirmation`], {
                  state: { orderDetails: response }
                });
              },
              error: (err) => {
                console.error('Error placing order:', err);
                alert('Failed to place the order. Please try again.');
              }
            });
          });
        },
        onError: (err: any) => {
          console.error('Error during PayPal payment:', err);
          alert('Payment failed. Please try again.');
        }
      }).render('#paypal-button-container'); // The container where the button will be rendered
    }
  }
}
