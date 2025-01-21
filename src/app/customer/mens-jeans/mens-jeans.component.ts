import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-mens-jeans',
  templateUrl: './mens-jeans.component.html',
  styleUrls: ['./mens-jeans.component.css']
})
export class MensJeansComponent {

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
 mensJeansCategories: any = {
    jeans: [],
  };
  private modalInstance: Modal | null = null;
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
    this.fetchMensCategories(this.pageNumber, this.pageSize);
  }

  fetchMensCategories(pageNumber: number, pageSize: number): void {
    this.productService.getMenProducts("Jeans",pageNumber, pageSize).subscribe({
      next: (response: any) => {
        const allProducts = response.contents;
        this.mensJeansCategories.jeans = allProducts.filter(
          (item: any) => item.productType ==='Jeans'
        );

        this.mensJeansCategories.jeans.forEach((item: any) => {
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
        this.showToast('Error fetching mens categories. Please try again later.');
      }
    });
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchMensCategories(this.pageNumber, this.pageSize);
  }

  openModal(productId: number, event?: MouseEvent): void {
    // Find the product data first
    const category = Object.values(this.mensJeansCategories).flat();
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
  // openModal(itemId: number, event: MouseEvent): void {
  //   const category = Object.values(this.mensJeansCategories).flat();
  //   const selectedItem = category.find((item: any) => item.productId === itemId);

  //   if (selectedItem) {
  //     this.modalData = selectedItem;
  //     const target = event.target as HTMLElement;
  //     const cardElement = target.closest('.card') as HTMLElement;
  //     const rect = cardElement.getBoundingClientRect();

  //     this.modalStyle = {
  //       top: `${rect.top}px`,
  //       left: `${rect.left}px`,
  //       transform: 'scale(0)',
  //       opacity: '0'
  //     };

  //     setTimeout(() => {
  //       this.modalStyle = {
  //         top: '50%',
  //         left: '50%',
  //         transform: 'translate(-50%, -50%)',
  //         opacity: '1'
  //       };
  //     }, 10);

  //     const modalElement = document.getElementById('mensCategoryModal');
  //     if (!modalElement) {
  //       return;
  //     }

  //     this.modal = new Modal(modalElement);
  //     this.modal.show();
  //   }
  // }

  // closeModal(): void {
  //   if (this.modal) {
  //     this.modal.hide();
  //   }
  // }

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
