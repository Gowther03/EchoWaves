import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-mens',
  templateUrl: './mens.component.html',
  styleUrls: ['./mens.component.css']
})
export class MensComponent implements OnInit {
  mensCategories: any = {
    jeans: [],
    shirts: [],
    tshirts: [],
    jackets: [],
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

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.fetchMensCategories(this.pageNumber, this.pageSize);
  }

  fetchMensCategories(pageNumber: number, pageSize: number): void {
    this.productService.getMenProducts(pageNumber, pageSize).subscribe({
      next: (response: any) => {
        const allProducts = response.contents;
        this.mensCategories.jeans = allProducts.filter(
          (item: any) => item.productType === 'Jeans'
        );
        this.mensCategories.shirts = allProducts.filter(
          (item: any) => item.productType === 'Shirt'
        );
        this.mensCategories.tshirts = allProducts.filter(
          (item: any) => item.productType === 'T-Shirt'
        );
        this.mensCategories.jackets = allProducts.filter(
          (item: any) => item.productType === 'Jacket'
        );

        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
      },
      error: (err: any) => {
        console.error('Error fetching mens categories:', err.message);
      }
    });
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchMensCategories(this.pageNumber, this.pageSize);
  }

  openModal(itemId: number, event: MouseEvent): void {
    const category = Object.values(this.mensCategories).flat();
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

      const modalElement = document.getElementById('mensCategoryModal');
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
        alert('Failed to add product to cart. Please try again.');
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
