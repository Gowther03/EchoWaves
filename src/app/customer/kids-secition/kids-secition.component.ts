import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-kids-secition',
  templateUrl: './kids-secition.component.html',
  styleUrls: ['./kids-secition.component.css'],
})
export class KidsSecitionComponent implements OnInit {
  kidsCategories: any = {
    tshirts: [],
    jeans: [],
    toys: [],
  };

  modalData: any = {};
  quantity: number = 1;
  pageNumber: number = 0;
  pageSize: number = 100;
  totalElements: number = 0;
  totalPages: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];

  modalStyle: any = {}; // Add this line to hold the modal style

  modal: Modal | undefined;

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.fetchKidsCategories(this.pageNumber, this.pageSize);
  }

  fetchKidsCategories(pageNumber: number, pageSize: number): void {
    this.productService.getKidsProducts(pageNumber, pageSize).subscribe({
      next: (response: any) => {
        const allProducts = response.contents;
        this.kidsCategories.tshirts = allProducts.filter(
          (item: any) => item.productType === 'T-Shirt'
        );
        this.kidsCategories.jeans = allProducts.filter(
          (item: any) => item.productType === 'Jeans'
        );
        this.kidsCategories.toys = allProducts.filter(
          (item: any) => item.productType === 'Toys'
        );

        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
      },
      error: (err: any) => {
        console.error('Error fetching kids categories:', err.message);
      },
    });
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchKidsCategories(this.pageNumber, this.pageSize);
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
        opacity: '0',
      };

      setTimeout(() => {
        this.modalStyle = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: '1',
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

  addToCart(): void {
    console.log('Adding to cart...');
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
