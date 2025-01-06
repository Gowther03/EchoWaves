import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  
  
  // private apiUrl = `${environment.apiBaseUrl}/products`;
  private apiUrl:any="http://localhost:8080/app/products"

  constructor(private http: HttpClient) { }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
  // Get product by ID
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Update product by ID
  updateProduct(product: any): Observable<any> {
    console.log(product);
    console.log(product.productId);
    return this.http.put<any>(`http://localhost:8080/app/product/update/${product.productId}`, product);  // Correct API call with product ID
  }

  deleteProductById(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/app/product/delete?productId=${id}`);
  }
  
  getAllProducts(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getMenProducts(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/products/Men?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getWomenProducts(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/products/Women?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getKidsProducts(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/products/Kids?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }


  addtoCart(requestBody: any): Observable<any> {
    console.log(requestBody);
    return this.http.post(`http://localhost:8080/app/carts`, requestBody);
  }

  getCartDetails(userName: any): Observable<any> {
    return this.http.get(`http://localhost:8080/app/customer/cart?userName=${userName}`);
  }

  updateCartItem(cartId:any, cartItemId: any, productQuantity: any) {
    return this.http.put(`http://localhost:8080/app/carts/item/update?cartId=${cartId}&cartItemId=${cartItemId}&quantity=${productQuantity}`, null);
  }

  removeitemfromCart(cartId:any, cartItemId: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/app/carts/remove?cartId=${cartId}&cartItemId=${cartItemId}`);
  }
}
