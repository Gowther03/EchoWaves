import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  addProductForm: FormGroup;
  selectedImages: File[] = [];
  availableProductTypes: string[] = [];
  isLoading = false; //
  toastMessage = '';

  private categoryProductTypeMap: Record<string, string[]> = {
    Men: ['Jeans', 'Shirt', 'T-Shirt', 'Jacket'],
    Women: ['Bottomwear', 'Outerwear', 'Top', 'Jacket'],
    Kids: ['Jumpsuit', 'Sportswear', 'Traditional', 'Dresses'],
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private router: Router
  ) {
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required, Validators.maxLength(100)]],
      productType: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      categoryName: ['', Validators.required],
      stockQuantity: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      productDescription: ['', [Validators.required, Validators.maxLength(500)]],
      images: ['', Validators.required], // Make images field required
    });
  }
  closeToast() {
    const toast = document.getElementById('errorToast');
    if (toast) {
      toast.classList.remove('show'); // Hide the toast
    }
  }
  onCategoryChange(event: any): void {
    const selectedCategory = event.target.value;
    this.availableProductTypes = this.categoryProductTypeMap[selectedCategory] || [];
    this.addProductForm.controls['productType'].setValue('');
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      this.isLoading = true;
      const formData = new FormData();
      Object.keys(this.addProductForm.value).forEach((key) =>
        formData.append(key, this.addProductForm.value[key])
      );

      this.selectedImages.forEach((file) =>
        formData.append('images', file, file.name)
      );

      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          this.showToast('Product added successfully');
          this.isLoading = false;
          console.log('Product added successfully:', response);
          setTimeout(() => {
            this.router.navigateByUrl('/AdminDashboard/productPages');
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Product addition failed:', err.message);
          this.showToast(err.error.message);
        },
      });
    } else {
      
      console.log('Form is invalid');
      this.showToast('Please fill all the required fields');
    }
  }

  onFileSelect(event: any): void {
    const files = event.target.files;
    this.selectedImages = Array.from(files);
    // Update images field status based on selection
    if (this.selectedImages.length > 0) {
      this.addProductForm.controls['images'].setValue(this.selectedImages);
    } else {
      this.addProductForm.controls['images'].setValue('');
    }
  }

  showToast(message: string) {
    this.toastMessage = message;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}

