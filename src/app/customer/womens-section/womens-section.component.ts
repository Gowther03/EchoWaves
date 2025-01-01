import { Component } from '@angular/core';

@Component({
  selector: 'app-womens-section',
  templateUrl: './womens-section.component.html',
  styleUrls: ['./womens-section.component.css']
})
export class WomensSectionComponent 
{
  quantity: number = 1;
  cart: { productName: string; price: number; quantity: number }[] = [];

  increaseQuantity() {
    // Get the element and cast it to HTMLInputElement
    const quantityInput = <HTMLInputElement>document.getElementById("quantity");

    if (quantityInput) {
        let quantity = parseInt(quantityInput.value, 10);
        quantity++;
        quantityInput.value = quantity.toString();
    }
}
decreaseQuantity() {
const quantityInput = <HTMLInputElement>document.getElementById("quantity");

    if (quantityInput) {
        let quantity = parseInt(quantityInput.value, 10);
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity.toString();
        }
    }
}

  addToCart() {
    const product = {
      productName: 'Product Name',
      price: 999.00,
      quantity: this.quantity
    };
    this.cart.push(product);
    console.log('Cart:', this.cart);
  }

}
