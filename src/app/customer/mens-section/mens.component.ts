import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';

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
  modalStyle: any = {};
  modal: Modal | undefined;

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
        },
        error: (err: any) => {
          console.error(`Error fetching ${category} products:`, err.message);
          alert(err.error.message)
        }
      });
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['CustomerDashboard/:userName/mensSection/', category]);
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

  addToCart(productId: number): void {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      console.error('Cart ID is not available.');
      return;
    }

    const requestBody = {
      cartId: +cartId,
      productId: productId,
      quantity: this.quantity,
    };

    this.productService.addtoCart(requestBody).subscribe({
      next: (response: any) => {
        alert(`${this.modalData.productName} added to cart successfully!`);
        this.closeModal();
      },
      error: (err: any) => {
        alert('Failed to add product to cart. Please try again.');
        alert(err.error.message);
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
