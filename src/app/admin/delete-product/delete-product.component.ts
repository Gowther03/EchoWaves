import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  productId: string | any;
  product: any;  // To hold the product details

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the product ID from the URL (assuming it's passed as a route parameter)
    this.productId = this.route.snapshot.paramMap.get('id')!;
    // Fetch product details to display on the page
    this.loadProductData();
  }

  // Load product data based on product ID
  loadProductData(): void {
    this.productService.getProductById(this.productId).subscribe(
      (data) => {
        this.product = data;
      },
      (error) => {
        console.error('Error fetching product data:', error);
        this.product = null;  // Set product to null if not found or error occurs
      }
    );
  }

  // Delete product logic
  onDeleteProduct(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.productId).subscribe(
        (response) => {
          console.log('Product deleted successfully');
          this.router.navigate(['/products']);  // Navigate to product list after successful deletion
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
