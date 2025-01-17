import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-womens-section',
  templateUrl: './womens-section.component.html',
  styleUrls: ['./womens-section.component.css']
})
export class WomensSectionComponent implements OnInit {
   womensCategories: any = {
    bottomwear: [],
    outerwear: [],
    top: [],
    jackets: [],
    };
  
    modalData: any = {};
    quantity: number = 1;
    modalStyle: any = {};
    modal: Modal | undefined;
    quantities: { [productId: number]: number } = {};

    toastMessage = '';

  showToast(message: string) {
    this.toastMessage = message;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
  
    constructor(private productService: ProductServiceService,private router: Router) {}
  
    ngOnInit(): void {
      this.fetchWomensCategories();
    }
  
    fetchWomensCategories(): void {
      const categories = ['bottomwear', 'outerwear', 'top', 'jackets'];
  
      categories.forEach(category => {
        this.productService.getHotProducts('Women').subscribe({
          next: (response: any[]) => {
            const filteredProducts = response.filter((item: any) => {
              switch (category) {
                case 'bottomwear': return item.productType === 'Bottomwear';
                case 'outerwear': return item.productType === 'Outerwear';
                case 'top': return item.productType === 'Top';
                case 'jackets': return item.productType === 'Jacket';
                default: return false;
              }
            });
            this.womensCategories[category] = filteredProducts.slice(0, 3); // Limit to 3 items

            filteredProducts.forEach((item: any) => {
              if (!this.quantities[item.productId]) {
                this.quantities[item.productId] = 1; // Default quantity
              }
            });
          },
          error: (err: any) => {
            console.error(`Error fetching ${category} products:`, err.message);
            this.showToast(`Error fetching ${category} products. Please try again later.`);
          }
        });
      });
    }
  
    navigateToCategory(category: string): void {
      this.router.navigate(['CustomerDashboard/:userName/womensSection/', category]);
    }
    openModal(itemId: number, event: MouseEvent): void {
      const category = Object.values(this.womensCategories).flat();
      const selectedItem = category.find((item: any) => item.productId === itemId);
  
      if (selectedItem) {
        this.modalData = selectedItem;
        const target = event.target as HTMLElement;
        const cardElement = target.closest('.card') as HTMLElement;
        const rect = cardElement.getBoundingClientRect();
  
        this.modalStyle = {
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          transform: 'scale(0)',
          opacity: '0'
        };
  
        setTimeout(() => {
          this.modalStyle = {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: '1'
          };
        }, 10);
  
        const modalElement = document.getElementById('womensCategoryModal');
        if (!modalElement) {
          return;
        }
  
        this.modal = new Modal(modalElement);
        this.modal.show();
      }
    }
  
    closeModal(): void {
      if (this.modal) {
        this.modal.hide();
      }
    }
  
    /**
     * Add product to the cart.
     * @param productId - ID of the product to be added to the cart.
     */
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
