import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: { productName: string; price: number; quantity: number }[] = [
    // Example data; replace with actual cart data
    { productName: 'Product Name 1', price: 500, quantity: 2 },
    { productName: 'Product Name 2', price: 700, quantity: 1 }
  ];

  calculateTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

}
