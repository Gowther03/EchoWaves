import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-mens',
  templateUrl: './mens.component.html',
  styleUrls: ['./mens.component.css']
})
export class MensComponent implements OnInit {

  toastMessage = '';

  showToastFlag: boolean = false;

  showToast(message: string) {
    if (!message) return; // Don't show empty messages
    this.toastMessage = message;
    this.showToastFlag = true;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
  closeToast() {
    this.showToastFlag = false;
    this.toastMessage = '';
    const toast = document.getElementById('errorToast');
    if (toast) {
      toast.classList.remove('show');
    }
  }
  
  mensCategories: any = {
    jeans: [],
    shirts: [],
    tshirts: [],
    jackets: [],
  };
  private modalInstance: Modal | null = null;

  modalData: any = {};
  quantity: number = 1;
  modalStyle: any = {};
  modal: Modal | undefined;

  quantities: { [productId: number]: number } = {};



  constructor(private productService: ProductServiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMensCategories();
  }

  fetchMensCategories(): void {
    const categories = ['jeans', 'shirts', 'tshirts', 'jackets'];

    categories.forEach(category => {
      this.productService.getHotProducts('Men').subscribe({
        next: (response: any[]) => {
          const filteredProducts = response.filter((item: any) => {
            switch (category) {
              case 'jeans': return item.productType === 'Jeans';
              case 'shirts': return item.productType === 'Shirt';
              case 'tshirts': return item.productType === 'T-Shirt';
              case 'jackets': return item.productType === 'Jacket';
              default: return false;
            }
          });
          this.mensCategories[category] = filteredProducts.slice(0, 3); // Limit to 3 items

          filteredProducts.forEach((item: any) => {
            if (!this.quantities[item.productId]) {
              this.quantities[item.productId] = 1; // Default quantity
            }
          });
        },
        error: (err: any) => {
          console.error(`Error fetching ${category} products:`, err.message);
          alert(err.error.message)
          this.showToast('Error fetching products. Please try again later.');
        }
      });
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['CustomerDashboard/:userName/mensSection/', category]);
  }

  openModal(productId: number, event?: MouseEvent): void {
    // Find the product data first
    const category = Object.values(this.mensCategories).flat();
    const product = category.find((item: any) => item.productId === productId);
    if (!product) return;

    // Update modal data
    this.modalData = { ...product };

    // Initialize modal if not already done
    if (!this.modalInstance) {
      const modalElement = document.getElementById('mensCategoryModal');
      if (modalElement) {
        this.modalInstance = new Modal(modalElement, {
          backdrop: 'static',
          keyboard: false
        });
      }
    }

    // Show the modal
    this.modalInstance?.show();
  }

  closeModal(): void {
    this.modalInstance?.hide();
  }
  addToCart(productId: number): void {
       const cartId = localStorage.getItem('cartId'); // Retrieve cartId from localStorage
   
       if (!cartId) {
         console.error('Cart ID is not available.');
         return;
       }
   
       const requestBody = {
         cartId: +cartId, // Convert cartId to a number
         productId: productId,
         quantity: this.quantities[productId],
       };
       console.log('Add to cart request:', requestBody);
       this.productService.addtoCart(requestBody).subscribe({
         next: (response: any) => {
           console.log('Product added to cart successfully:', response);
           this.showToast(`Item added to cart successfully!`);
           this.closeModal();
         },
         error: (err: any) => {
           console.error('Error adding product to cart:', err.message);
           this.showToast('Failed to add product to cart. Please try again later.');
         }
       });
     }
   
     increaseQuantity(productId: number): void {
      this.quantities[productId]++;
    }
    
    decreaseQuantity(productId: number): void {
      if (this.quantities[productId] > 1) {
        this.quantities[productId]--;
      }
    }
}
