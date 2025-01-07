import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {
  constructor(private http: HttpClient) {}

  onUploadCSV(event: any): void {
    event.preventDefault();
  
    const fileInput = event.target.querySelector('input[type="file"]');
    if (fileInput.files.length === 0) {
      alert('Please select a CSV file to upload.');
      return;
    }
  
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    this.http.post('http://localhost:8080/api/uploadProductCSV', formData, { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response); // Display the response from the backend
      },
      error: (err) => {
        console.error('Error uploading CSV:', err);
        alert('Failed to upload CSV file.');
      },
    });
  }
  
}
