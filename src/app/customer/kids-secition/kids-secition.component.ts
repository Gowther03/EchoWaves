import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kids-secition',
  templateUrl: './kids-secition.component.html',
  styleUrls: ['./kids-secition.component.css'],
})
export class KidsSecitionComponent implements OnInit {
  kidsCategories: any = {
    jumpsuit: [],
    sportswear: [],
    traditional: [],
    dresses: [],
     };
   
     modalData: any = {};
     quantity: number = 1;
     modalStyle: any = {};
     modal: Modal | undefined;
   
     constructor(private productService: ProductServiceService,private router: Router) {}
   
     ngOnInit(): void {
       this.fetchkidssCategories();
     }
   
     
   
     fetchkidssCategories(): void {
      const categories = ['jumpsuit', 'traditional', 'sportswear', 'dresses'];
  
      categories.forEach(category => {
        this.productService.getHotProducts('Kids').subscribe({
          next: (response: any[]) => {
            const filteredProducts = response.filter((item: any) => {
              switch (category) {
                case 'jumpsuit': return item.productType === 'Jumpsuit';
                case 'traditional': return item.productType === 'Traditional';
                case 'sportswear': return item.productType === 'Sportswear';
                case 'dresses': return item.productType === 'Dresses';
                default: return false;
              }
            });
            this.kidsCategories[category] = filteredProducts.slice(0, 3); // Limit to 3 items
          },
          error: (err: any) => {
            console.error(`Error fetching ${category} products:`, err.message);
            alert(err.error.message)
          }
        });
      });
    }
   
     navigateToCategory(category: string): void {
       this.router.navigate(['CustomerDashboard/:userName/kidsSection/', category]);
     }
     openModal(itemId: number, event: MouseEvent): void {
       const category = Object.values(this.kidsCategories).flat();
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
   
         const modalElement = document.getElementById('kidsCategoryModal');
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
         quantity: this.quantity,
       };
       console.log('Add to cart request:', requestBody);
       this.productService.addtoCart(requestBody).subscribe({
         next: (response: any) => {
           console.log('Product added to cart successfully:', response);
           alert(`${this.modalData.productName} added to cart successfully!`);
           this.closeModal();
         },
         error: (err: any) => {
           console.error('Error adding product to cart:', err.message);
           alert(err.error.message)
         }
       });
     }
   
     increaseQuantity(): void {
       this.quantity++;
     }
   
     decreaseQuantity(): void {
       if (this.quantity > 1) {
         this.quantity--;
       }
     }
   }
   