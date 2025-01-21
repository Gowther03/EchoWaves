import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent implements OnInit {
  products: any[] = []; // Holds the list of products
  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  pageNumber: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];
  toastMessage = '';

  constructor(private productService: ProductServiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts(this.pageNumber, this.pageSize);
  }

  // Fetch all products with pagination
  fetchProducts(pageNumber: number, pageSize: number): void {
    this.productService.getAllProducts(pageNumber, pageSize).subscribe(
      (response) => {
        this.products = response.contents;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching products:', error.message);
        this.showToast(error.error.message);
      }
    );
  }

  // Delete a product by ID
  onDeleteProduct(productId: any): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProductById(productId).subscribe(
        () => {
          this.showToast('Product deleted successfully!');
          this.fetchProducts(this.pageNumber, this.pageSize);
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting product:', error.message);
          this.showToast(error.error.message);
        }
      );
    }
  }


  onPageChange(newPageNumber: number): void {
    this.pageNumber = newPageNumber;
    this.fetchProducts(this.pageNumber, this.pageSize);
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
