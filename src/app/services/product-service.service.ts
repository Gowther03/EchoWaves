import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  // private apiUrl = `${environment.apiBaseUrl}/products`;
  private apiUrl="http://localhost:8080/practiceApp/employees"

  constructor(private http: HttpClient) { }

  // Get product by ID
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Update product by ID
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
getAllProducts(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);  // Get all products as an array
}
}
