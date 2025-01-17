import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartDetails: any;
  toastMessage = '';

  constructor(private productService: ProductServiceService, private ordersService: OrdersService,private router: Router) {}

  ngOnInit(): void {
    this.fetchCartDetails();
  }

  fetchCartDetails(): void {
    const userName = localStorage.getItem('userName');
    this.productService.getCartDetails(userName).subscribe({
      next: (response: any) => {
        this.cartDetails = response;
      },
      error: (err: any) => {
        console.error('Error fetching cart details:', err.message);
        this.showToast(err.error.message)
      }
    });
  }

  placeOrder(): void {
    // Here, we don't call the backend service; we just navigate to the CheckoutComponent
    const totalAmount = this.cartDetails.totalAmount; // Or calculate based on cart details
    this.router.navigate(['CustomerDashboard/:userName/checkout'], { state: { totalAmount: totalAmount, cartDetails: this.cartDetails } });
  }


  increaseQuantity(item: any): void {
    if (item.productQuantity < item.product.stockQuantity) {
      item.productQuantity++;
      this.addCartItem(item);
    }
  }
  
  decreaseQuantity(item: any): void {
    if (item.productQuantity > 1) {
      item.productQuantity--;
      this.reduceCartItem(item);
    }
  }

  addCartItem(item: any): void {
    // Call API or update logic to modify cart item quantity and total amount
    this.productService.addCartItem(this.cartDetails.cartId,item.cartItemId, item.productQuantity).subscribe({
      next: (response) => {
        this.fetchCartDetails(); // Refresh cart details
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error updating cart item:', err.message);
        this.showToast(err.error.message)
      }
    });
  }

  reduceCartItem(item: any): void {
    // Call API or update logic to modify cart item quantity and total amount
    this.productService.reduceCartItem(this.cartDetails.cartId,item.cartItemId, item.productQuantity).subscribe({
      next: (response) => {
        this.fetchCartDetails(); // Refresh cart details
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error updating cart item:', err.message);
        this.showToast(err.error.message)
      }
    });
  }

  removeItem(item: any): void {
    this.productService.removeitemfromCart(this.cartDetails.cartId,item.cartItemId).subscribe({
      next: (response) => {
        console.log('Item removed successfully:', response);
        this.showToast('Item removed successfully');
        this.fetchCartDetails(); // Refresh cart details after removing item
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error removing item from cart:', err.message);
        this.showToast(err.error.message)
      }
    });
  }
  
  showToast(message: string) {
    this.toastMessage = message;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}
