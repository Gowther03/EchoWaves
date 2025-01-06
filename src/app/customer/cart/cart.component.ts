import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartDetails: any;

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
      }
    });
  }

  placeOrder(): void {
    const cartId = this.cartDetails.cartId;
    const userName = localStorage.getItem('userName');

    this.ordersService.placeOrder(cartId, userName).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        this.router.navigate(['/CustomerDashboard/:userName/order-confirmation'], { state: { orderDetails: response } });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error placing order:', err.message);
        alert('Failed to place the order. Please try again.');
      }
    });
  }


  increaseQuantity(item: any): void {
    if (item.productQuantity < item.product.stockQuantity) {
      item.productQuantity++;
      this.updateCartItem(item);
    }
  }
  
  decreaseQuantity(item: any): void {
    if (item.productQuantity > 1) {
      item.productQuantity--;
      this.updateCartItem(item);
    }
  }

  updateCartItem(item: any): void {
    // Call API or update logic to modify cart item quantity and total amount
    this.productService.updateCartItem(this.cartDetails.cartId,item.cartItemId, item.productQuantity).subscribe({
      next: (response) => {
        this.fetchCartDetails(); // Refresh cart details
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error updating cart item:', err.message);
      }
    });
  }

  removeItem(item: any): void {
    this.productService.removeitemfromCart(this.cartDetails.cartId,item.cartItemId).subscribe({
      next: (response) => {
        console.log('Item removed successfully:', response);
        this.fetchCartDetails(); // Refresh cart details after removing item
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error removing item from cart:', err.message);
      }
    });
  }
  
}
