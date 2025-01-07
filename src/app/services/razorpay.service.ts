// razorpay.service.ts

import { Injectable } from '@angular/core';

declare var Razorpay: any;  // Declare Razorpay since it's loaded via CDN in index.html

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor() { }

  public openPaymentGateway(orderDetails: any): void {
    const options = {
      key: 'your_razorpay_key_id',  // Use your Razorpay Key ID
      amount: orderDetails.amount * 100,  // Amount in paisa (1 INR = 100 paisa)
      currency: 'INR',
      order_id: orderDetails.id,
      name: 'Your Store Name',
      description: 'Payment for Order',
      image: 'logo3.png',  // Optional logo for payment page
      handler: function(response: any) {
        console.log(response);
        // Send payment response to backend for verification
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '1234567890',
      },
      notes: {
        address: 'Customer address',
      },
      theme: {
        color: '#F37254'
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  }
}
