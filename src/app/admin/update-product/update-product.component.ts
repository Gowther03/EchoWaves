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

  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      productType: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      categoryName: ['', Validators.required],
      stockQuantity: ['', [Validators.required, Validators.min(1)]],
      productDescription: ['', Validators.required],
    });

    this.fetchProducts(this.pageNumber, this.pageSize);
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
      this.productService.uploadProductImageCSV(this.selectedFile, productId).subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          alert('File uploaded successfully!');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error uploading file:', err);
        }
      });
    } else {
      console.log('No file selected');
    }
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchProducts(this.pageNumber, this.pageSize);
  }
}
