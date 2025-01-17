import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchForm: FormGroup;
  products: any[] = [];

  modalData: any = {};
    quantity: number = 1;
    
    modalStyle: any = {};
    modal: Modal | undefined;

    toastMessage = '';

    showToast(message: string) {
      this.toastMessage = message;
      const toastElement = document.getElementById('errorToast');
      if (toastElement) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
      }
    }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private productService: ProductServiceService) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      this.searchForm.get('searchQuery')?.setValue(query);
      this.searchProducts(query);
    });
  }

  searchProducts(query: string) {
    this.productService.getAllProducts(0, 10).subscribe(response => {
      if (response && response.contents) {
        const lowerCaseQuery = query.toLowerCase();
        this.products = response.contents.filter((product: any) => {
          return (
            product?.productDescription?.toLowerCase().includes(lowerCaseQuery) ||
            product?.productName?.toLowerCase().includes(lowerCaseQuery) ||
            product?.productType?.toLowerCase().includes(lowerCaseQuery) ||
            product?.categoryName?.toLowerCase().includes(lowerCaseQuery) ||
            product?.productPrice?.toString().toLowerCase().includes(lowerCaseQuery)
          );
        });
      } else {
        console.error('Invalid response format:', response);
        this.showToast('Invalid response format');
        this.products = []; // Handle empty or invalid responses
      }
    }, error => {
      console.error('Error fetching products:', error);
      this.showToast('Error fetching products');
      this.products = []; // Clear products in case of an error
    });
  }
  


  openModal(itemId: number, event: MouseEvent): void {
      
      const selectedItem = this.products.find((item: any) => item.productId === itemId);
  
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
  
        const modalElement = document.getElementById('searchProductModal');
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
        this.showToast(`Item added to cart successfully!`);

        this.closeModal();
      },
      error: (err: any) => {
        console.error('Error adding product to cart:', err.message);
        this.showToast('Error adding product to cart, Please try again');

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
