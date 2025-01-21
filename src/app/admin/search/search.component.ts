import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  products: any[] = [];
    totalElements: number = 0;
    totalPages: number = 0;
    pageSize: number = 9;
    pageNumber: number = 0;
    isLastPage: boolean = false;
    pages: number[] = [];
    selectedFiles: { [productId: number]: File[] } = {}; // Store selected files by product ID
    toastMessage = '';
  
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
        this.router.navigate(['CustomerDashboard/:userName/search'], { queryParams: { query: searchQuery } });
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
