import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  addProductForm: FormGroup;
  selectedImages: File[] = [];
  availableProductTypes: string[] = [];

  private categoryProductTypeMap: Record<string, string[]> = {
    Men: ['jeans', 'shirts', 'tshirts', 'jackets'],
    Women: ['bottomwear', 'outerwear', 'top', 'jackets'],
    Kids: ['jumpsuit', 'sportswear', 'traditional', 'dresses'],
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
    });
  }

  onCategoryChange(event: any): void {
    const selectedCategory = event.target.value;
    this.availableProductTypes = this.categoryProductTypeMap[selectedCategory] || [];
    this.addProductForm.controls['productType'].setValue('');
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const formData = new FormData();
      Object.keys(this.addProductForm.value).forEach((key) =>
        formData.append(key, this.addProductForm.value[key])
      );

      this.selectedImages.forEach((file) =>
        formData.append('images', file, file.name)
      );

      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this.router.navigateByUrl('/AdminDashboard/productPages');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Product addition failed:', err.message);
          alert(err.error.message);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onFileSelect(event: any): void {
    const files = event.target.files;
    this.selectedImages = Array.from(files);
  }
}
