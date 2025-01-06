import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  addProductForm: FormGroup | any;
  selectedImages: File[] = [];


  constructor(private fb: FormBuilder,private productService: ProductServiceService, private router:Router) {}

  ngOnInit(): void {
    // Initialize the form with form controls and validation
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required, Validators.maxLength(100)]],
      productType: ['', [Validators.required, Validators.maxLength(50)]],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      categoryName: ['', [Validators.required, Validators.maxLength(50)]],
      stockQuantity: ['', [Validators.required, Validators.min(1)]],
      images: [''],  // File input, will be handled in a different way
      productDescription: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      console.log(this.addProductForm.value);
      console.log(this.selectedImages);
  
      const formData = new FormData();
      formData.append('productName', this.addProductForm.value.productName);
      formData.append('productType', this.addProductForm.value.productType);
      formData.append('productPrice', this.addProductForm.value.productPrice);
      formData.append('categoryName', this.addProductForm.value.categoryName);
      formData.append('stockQuantity', this.addProductForm.value.stockQuantity);
      formData.append('productDescription', this.addProductForm.value.productDescription);
      
  
      // Append each selected image to the FormData object
      this.selectedImages.forEach((file, index) => {
        formData.append('images', file, file.name); // 'images' should match the key expected by the backend
      });
  
      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this.router.navigateByUrl('/AdminDashboard/productPages');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Product addition failed:', err.message);
          alert('Product addition failed. Please try again.');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  // Handle file input (images)
  onFileSelect(event: any): void {
    const files = event.target.files;
    this.selectedImages = Array.from(files);
  }
}
