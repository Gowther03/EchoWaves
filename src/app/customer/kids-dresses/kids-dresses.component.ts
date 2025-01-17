
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-kids-dresses',
  templateUrl: './kids-dresses.component.html',
  styleUrls: ['./kids-dresses.component.css']
})
export class KidsDressesComponent {

  toastMessage = '';

  showToast(message: string) {
    this.toastMessage = message;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }

  closeToast() {
    const toast = document.getElementById('errorToast');
    if (toast) {
      toast.classList.remove('show'); // Hide the toast
    }
  }

  KidsDressesCategories: any = {
    dresses: [],
     };
   
     modalData: any = {};
     quantity: number = 1;
     pageNumber: number = 0;
     pageSize: number = 10; // Number of items per page
     totalElements: number = 0;
     totalPages: number = 0;
     isLastPage: boolean = false;
     pages: number[] = [];
     modalStyle: any = {};
     modal: Modal | undefined;

     quantities: { [productId: number]: number } = {};
   
     constructor(private productService: ProductServiceService,private router: Router) {}
   
     ngOnInit(): void {
       this.fetchkidssCategories(this.pageNumber, this.pageSize);
     }
   
     fetchkidssCategories(pageNumber: number, pageSize: number): void {
       this.productService.getKidsProducts("Dresses",pageNumber, pageSize).subscribe({
         next: (response: any) => {
           const allProducts = response.contents;
           this.KidsDressesCategories.dresses = allProducts.filter(
             (item: any) => item.productType === 'Dresses'
           );

           this.KidsDressesCategories.dresses.forEach((item: any) => {
            this.quantities[item.productId] = 1; // Default quantity
          });
           
           this.totalElements = response.totalElements;
           this.totalPages = response.totalPages;
           this.isLastPage = response.last;
           this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
         },
         error: (err: any) => {
           console.error('Error fetching mens categories:', err.message);
           alert(err.error.message)
         }
       });
     }
   
     onPageChange(newPageNumber: number): void {
       this.pageNumber = newPageNumber;
       this.fetchkidssCategories(this.pageNumber, this.pageSize);
     }
   
     navigateToCategory(category: string): void {
       this.router.navigate(['CustomerDashboard/:userName/kidsSection/', category]);
     }
     openModal(itemId: number, event: MouseEvent): void {
       const category = Object.values(this.KidsDressesCategories).flat();
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
   
         const modalElement = document.getElementById('KidsDressesCategoryModal');
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
