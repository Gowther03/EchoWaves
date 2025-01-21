import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent {
  products: any[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 9;
  pageNumber: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];

  toastMessage = '';
  selectedFiles: { [productId: number]: File[] } = {}; // Store selected files by product ID

  searchForm: FormGroup;
  


  constructor(private router : Router,private productService: ProductServiceService, private fb: FormBuilder) { 
    this.searchForm = this.fb.group({
      searchQuery: ['']  // Initialize searchQuery form control
    });
  }
  ngOnInit(): void {
    this.fetchProducts(this.pageNumber, this.pageSize);
  }

  fetchProducts(pageNumber: number, pageSize: number): void {
    this.productService.getAllProducts(pageNumber, pageSize).subscribe({
      next: (response) => {
        this.products = response.contents; // Ensure 'contents' matches backend response
        console.log(this.products);
        
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching products:', err.message);
        this.showToast(err.error.message);
      },
    });
  }

  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchProducts(this.pageNumber, this.pageSize);
  }

  onSearch(): void {
    const searchQuery = this.searchForm.get('searchQuery')?.value;
    if (searchQuery) {
      this.productService.getAllProducts(this.pageNumber, this.pageSize).subscribe({
        next: (response) => {
          const lowerCaseQuery = searchQuery.toLowerCase();
          this.products = response.contents.filter((product: any) => {
            return (
              product?.productDescription?.toLowerCase().includes(lowerCaseQuery) ||
              product?.productName?.toLowerCase().includes(lowerCaseQuery) ||
              product?.productType?.toLowerCase().includes(lowerCaseQuery) ||
              product?.categoryName?.toLowerCase().includes(lowerCaseQuery) ||
              product?.productPrice?.toString().toLowerCase().includes(lowerCaseQuery)
            );
          });;
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
          this.isLastPage = response.last;
          this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching products:', err.message);
          this.showToast(err.error.message);
        },
      });
    }
  }


  onFileSelect(event: Event, productId: number): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.selectedFiles[productId] = Array.from(input.files);
    }
  }

  onChangeImages(productId: number): void {
    if (!this.selectedFiles[productId] || this.selectedFiles[productId].length === 0) {
      this.showToast('Please select files to upload.');
      return;
    }

    this.productService.updateProductImage(productId, this.selectedFiles[productId]).subscribe({
      next: () => {
        this.showToast('Images updated successfully!');
        this.fetchProducts(this.pageNumber, this.pageSize); // Refresh the product list
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error updating images:', err.message);
        this.showToast(err.error.message);
      },
    });
  }
  showToastFlag: boolean = false;

  showToast(message: string) {
    if (!message) return; // Don't show empty messages
    this.toastMessage = message;
    this.showToastFlag = true;
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
  closeToast() {
    this.showToastFlag = false;
    this.toastMessage = '';
    const toast = document.getElementById('errorToast');
    if (toast) {
      toast.classList.remove('show');
    }
  }
  
}

