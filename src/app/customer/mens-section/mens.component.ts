import { Component } from '@angular/core';

@Component({
  selector: 'app-mens',
  templateUrl: './mens.component.html',
  styleUrls: ['./mens.component.css']
})
export class MensComponent {

  // Ensure you have access to the carousel DOM
  cards: any[] = [
    { title: 'Card 1', description: 'Some quick example text for card 1.' },
    { title: 'Card 2', description: 'Some quick example text for card 2.' },
    { title: 'Card 3', description: 'Some quick example text for card 3.' },
    { title: 'Card 4', description: 'Some quick example text for card 4.' },
    { title: 'Card 5', description: 'Some quick example text for card 5.' },
    { title: 'Card 6', description: 'Some quick example text for card 6.' },
  ];

  currentIndex: number = 0;
  cardsPerSlide: number = 3;
  currentCards: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.updateCurrentCards();
  }

  // Update the visible cards based on current index
  updateCurrentCards() {
    this.currentCards = this.cards.slice(this.currentIndex, this.currentIndex + this.cardsPerSlide);
  }

  // Move to the next set of cards
  nextSlide() {
    if (this.currentIndex + this.cardsPerSlide < this.cards.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the start
    }
    this.updateCurrentCards();
  }

  // Move to the previous set of cards
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.cards.length - this.cardsPerSlide; // Loop back to the end
    }
    this.updateCurrentCards();
  }


// Event listener for previous button


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
