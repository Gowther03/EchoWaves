import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  products: any[] = [];
  updateProductForm: FormGroup = new FormGroup({});
  selectedProduct: any;
  selectedFile: File | null = null;

  // Pagination variables
  pageNumber: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];

  // Allowed categories and product types
  allowedCategories: string[] = ['Men', 'Women', 'Kids'];
  allowedProductTypes: { [key: string]: string[] } = {
    Men: ['jeans', 'shirts', 'tshirts', 'jackets'],
    Women: ['bottomwear', 'outerwear', 'top', 'jackets'],
    Kids: ['jumpsuit', 'sportswear', 'traditional', 'dresses'],
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      productId: ['', Validators.required],
      productName: ['', [Validators.required, Validators.maxLength(100)]],
      productType: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      categoryName: ['', [Validators.required, this.validateCategory.bind(this)]],
      stockQuantity: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      productDescription: ['', [Validators.required, Validators.maxLength(500)]],
    });

    this.fetchProducts(this.pageNumber, this.pageSize);

    // Watch for category changes to update allowed product types
    this.updateProductForm.get('categoryName')?.valueChanges.subscribe((category) => {
      if (this.allowedCategories.includes(category)) {
        this.updateProductForm.get('productType')?.setValidators([
          Validators.required,
          this.validateProductType.bind(this),
        ]);
      } else {
        this.updateProductForm.get('productType')?.clearValidators();
      }
      this.updateProductForm.get('productType')?.updateValueAndValidity();
    });
  }

  fetchProducts(pageNumber: number, pageSize: number): void {
    this.productService.getAllProducts(pageNumber, pageSize).subscribe({
      next: (response: any) => {
        this.products = response.contents;
        this.pageSize = response.pageSize;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching products:', err.message);
      },
    });
  }

  openModal(content: any, product: any): void {
    this.selectedProduct = product;
    console.log('Selected Product:', product);
    this.updateProductForm.patchValue({
      productId: product.productId,
      productName: product.productName,
      productType: product.productType,
      productPrice: product.productPrice,
      categoryName: product.categoryName,
      stockQuantity: product.stockQuantity,
      productDescription: product.productDescription,
    });
    this.modalService.open(content, { backdrop: 'static', size: 'lg' });
  }

  onUpdateProduct(): void {
    if (this.updateProductForm.valid) {
      const updatedProduct = this.updateProductForm.value;
      console.log('Updated Product:', updatedProduct);

      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          console.log('Product updated successfully');
          this.modalService.dismissAll();
          this.fetchProducts(this.pageNumber, this.pageSize);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating product:', err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onFileChange(event: any, productId: string): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected File:', file);
    }
  }

  onUploadFile(productId: string): void {
    if (this.selectedFile) {
      this.productService.uploadProductImageCSV(this.selectedFile, productId ).subscribe({
        next: (response) => {
          console.log(response);
          alert(response);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error uploading file:', err);
        },
      });
    } else {
      console.log('No file selected');
    }
  }

  onToggleHot(productId: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isHot = inputElement.checked;

    this.productService.setProductHot(productId, isHot).subscribe({
      next: () => {
        console.log(`Product ${productId} hot status updated to ${isHot}`);
      },
      error: (err: HttpErrorResponse) => {
        console.error(`Error updating hot status for product ${productId}:`, err);
      },
    });
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchProducts(this.pageNumber, this.pageSize);
  }

  // Custom validator to validate category
  validateCategory(control: any): { [key: string]: boolean } | null {
    if (control.value && !this.allowedCategories.includes(control.value)) {
      return { invalidCategory: true };
    }
    return null;
  }

  // Custom validator to validate product type based on selected category
  validateProductType(control: any): { [key: string]: boolean } | null {
    const category = this.updateProductForm.get('categoryName')?.value;
    if (category && control.value && !this.allowedProductTypes[category]?.includes(control.value)) {
      return { invalidProductType: true };
    }
    return null;
  }
}
