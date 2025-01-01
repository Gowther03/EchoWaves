import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  updateProductForm: FormGroup | any;
  productId: string | any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the product ID from the URL (assuming it's passed as a route parameter)
    this.productId = this.route.snapshot.paramMap.get('id')!;
    
    // Initialize the form group
    this.updateProductForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      images: ['']
    });

    // Fetch the product data to populate the form
    this.loadProductData();
  }

  // Method to load the product data
  loadProductData(): void {
    this.productService.getProductById(this.productId).subscribe(product => {
      this.updateProductForm.patchValue({
        name: product.name,
        type: product.type,
        price: product.price,
        category: product.category,
        stock: product.stock,
        description: product.description
      });
    });
  }

  // Handle file selection for product images
  onFileSelect(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.updateProductForm.patchValue({
        images: files
      });
    }
  }

  // Method to handle form submission
  onUpdateProduct(): void {
    if (this.updateProductForm.valid) {
      const updatedProduct = this.updateProductForm.value;
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(response => {
        // Navigate back to the product list or some other page upon successful update
        this.router.navigate(['/products']);
      });
    }
  }
}
