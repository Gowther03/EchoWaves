import { Component, HostListener } from '@angular/core';
import { ProductDescriptionService } from 'src/app/services/product-description.service';


declare var bootstrap: any;

@Component({
  selector: 'app-kids-secition',
  templateUrl: './kids-secition.component.html',
  styleUrls: ['./kids-secition.component.css']
})
export class KidsSecitionComponent {
  kidsCategories = {
    clothing: [
      {
        id: 1,
        title: 'Kids T-Shirt',
        description: 'Comfortable cotton T-shirt.',
        image: 'assets/WomensCategory.jpg',
        price: 299,
        images: [
          'https://via.placeholder.com/600x400?text=Clothing+Image+1',
          'https://via.placeholder.com/600x400?text=Clothing+Image+2',
          'https://via.placeholder.com/600x400?text=Clothing+Image+3'
        ]
      },
      {
        id: 2,
        title: 'Kids Jeans',
        description: 'Stylish denim jeans.',
        image: 'https://via.placeholder.com/300x200?text=Clothing+2',
        price: 599,
        images: [
          'https://via.placeholder.com/600x400?text=Clothing+Image+1',
          'https://via.placeholder.com/600x400?text=Clothing+Image+2',
          'https://via.placeholder.com/600x400?text=Clothing+Image+3'
        ]
      },
      {
        id: 3,
        title: 'Kids Jacket',
        description: 'Warm and cozy jacket.',
        image: 'https://via.placeholder.com/300x200?text=Clothing+3',
        price: 899,
        images: [
          'https://via.placeholder.com/600x400?text=Clothing+Image+1',
          'https://via.placeholder.com/600x400?text=Clothing+Image+2',
          'https://via.placeholder.com/600x400?text=Clothing+Image+3'
        ]
      }
    ],
    toys: [
      {
        id: 4,
        title: 'Stuffed Bear',
        description: 'Soft and cuddly stuffed bear.',
        image: 'assets/WomensCategory.jpg',
        price: 499,
        images: [
          'https://via.placeholder.com/600x400?text=Toys+Image+1',
          'https://via.placeholder.com/600x400?text=Toys+Image+2',
          'https://via.placeholder.com/600x400?text=Toys+Image+3'
        ]
      },
      {
        id: 5,
        title: 'Building Blocks',
        description: 'Colorful building blocks.',
        image: 'https://via.placeholder.com/300x200?text=Toys+2',
        price: 299,
        images: [
          'https://via.placeholder.com/600x400?text=Toys+Image+1',
          'https://via.placeholder.com/600x400?text=Toys+Image+2',
          'https://via.placeholder.com/600x400?text=Toys+Image+3'
        ]
      },
      {
        id: 6,
        title: 'Remote Car',
        description: 'Exciting remote-controlled car.',
        image: 'https://via.placeholder.com/300x200?text=Toys+3',
        price: 999,
        images: [
          'https://via.placeholder.com/600x400?text=Toys+Image+1',
          'https://via.placeholder.com/600x400?text=Toys+Image+2',
          'https://via.placeholder.com/600x400?text=Toys+Image+3'
        ]
      }
    ],
    accessories: [
      {
        id: 7,
        title: 'Kids Cap',
        description: 'Cool summer cap.',
        image: 'https://via.placeholder.com/300x200?text=Accessories+1',
        price: 199,
        images: [
          'https://via.placeholder.com/600x400?text=Accessories+Image+1',
          'https://via.placeholder.com/600x400?text=Accessories+Image+2',
          'https://via.placeholder.com/600x400?text=Accessories+Image+3'
        ]
      },
      {
        id: 8,
        title: 'Kids Sunglasses',
        description: 'Trendy sunglasses.',
        image: 'https://via.placeholder.com/300x200?text=Accessories+2',
        price: 399,
        images: [
          'https://via.placeholder.com/600x400?text=Accessories+Image+1',
          'https://via.placeholder.com/600x400?text=Accessories+Image+2',
          'https://via.placeholder.com/600x400?text=Accessories+Image+3'
        ]
      },
      {
        id: 9,
        title: 'Kids Watch',
        description: 'Fun and colorful watch.',
        image: 'https://via.placeholder.com/300x200?text=Accessories+3',
        price: 699,
        images: [
          'https://via.placeholder.com/600x400?text=Accessories+Image+1',
          'https://via.placeholder.com/600x400?text=Accessories+Image+2',
          'https://via.placeholder.com/600x400?text=Accessories+Image+3'
        ]
      }
    ]
  };

  quantity: number = 1;
  cart: { productName: string; price: number; quantity: number }[] = [];

  modalData: any = {};
  modalStyle: any = {};

  constructor() {}

  ngOnInit(): void {}

  openModal(itemId: number, event: MouseEvent): void {
    const category = Object.values(this.kidsCategories).flat();
    const selectedItem = category.find((item: any) => item.id === itemId);
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
      const bootstrapModal = new bootstrap.Modal(modalElement!);
      bootstrapModal.show();
    }
  }
  increaseQuantity() {
    // Get the element and cast it to HTMLInputElement
    const quantityInput = <HTMLInputElement>document.getElementById("quantity");

    if (quantityInput) {
        let quantity = parseInt(quantityInput.value, 10);
        quantity++;
        quantityInput.value = quantity.toString();
    }
}
decreaseQuantity() {
const quantityInput = <HTMLInputElement>document.getElementById("quantity");

    if (quantityInput) {
        let quantity = parseInt(quantityInput.value, 10);
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity.toString();
        }
    }
}
addTocart() {
  const product = {
    productName: 'Product Name',
    price: 999.00,
    quantity: this.quantity
  };
  this.cart.push(product);
  console.log('Cart:', this.cart);
}

  addToCart(productId: number): void {
    alert(`Product with ID ${productId} added to cart!`);
  }
}
