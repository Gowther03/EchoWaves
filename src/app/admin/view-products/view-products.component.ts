import { Component } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent {
  products: any[] = [];  // To hold the list of products

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    // Fetch all products when the component initializes
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;  // Assign fetched data to the products array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
