import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

  toastMessage = '';
  constructor(private http: HttpClient) {}

  onUploadCSV(event: any): void {
    event.preventDefault();
  
    const fileInput = event.target.querySelector('input[type="file"]');
    if (fileInput.files.length === 0) {
      this.showToast('Please select a CSV file to upload.');
      return;
    }
  
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    this.http.post('http://localhost:8080/api/uploadProductCSV', formData, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.showToast(response); // Display the response from the backend
      },
      error: (err) => {
        console.error('Error uploading CSV:', err);
        this.showToast('Failed to upload CSV file.');
      },
    });
  }

  closeToast() {
    const toast = document.getElementById('errorToast');
    if (toast) {
      toast.classList.remove('show'); // Hide the toast
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
