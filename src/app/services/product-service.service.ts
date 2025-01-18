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
  getProductById(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/product/details?productId=${id}`);
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

  getMenProducts(productType:string ,pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/products/Men?productType=${productType}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getWomenProducts(productType:string ,pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/products/Women?productType=${productType}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getKidsProducts(productType:string ,pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/products/Kids?productType=${productType}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }


  addtoCart(requestBody: any): Observable<any> {
    console.log(requestBody);
    return this.http.post(`http://localhost:8080/app/carts`, requestBody);
  }

  getCartDetails(userName: any): Observable<any> {
    return this.http.get(`http://localhost:8080/app/customer/cart?userName=${userName}`);
  }

  addCartItem(cartId:any, cartItemId: any, productQuantity: any) {
    return this.http.put(`http://localhost:8080/app/carts/item/add?cartId=${cartId}&cartItemId=${cartItemId}&quantity=${productQuantity}`, null);
  }

  reduceCartItem(cartId:any, cartItemId: any, productQuantity: any) {
    return this.http.put(`http://localhost:8080/app/carts/item/reduce?cartId=${cartId}&cartItemId=${cartItemId}&quantity=${productQuantity}`, null);
  }

  removeitemfromCart(cartId:any, cartItemId: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/app/carts/remove?cartId=${cartId}&cartItemId=${cartItemId}`);
  }

  uploadProductImageCSV(file: File, productId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post(`http://localhost:8080/api/uploadProductImageCSV?productId=${productId}`, formData, { responseType: 'text' });
  }
  
  uploadProductCSV(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`http://localhost:8080/api/uploadProductCSV`, formData);
  }

  getHotProducts(category:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/app/products/hot?category=${category}`);
  }

  setProductHot(productId: any, hot: any): Observable<any> {
    return this.http.put(`http://localhost:8080/app/product/hot?productId=${productId}&hot=${hot}`, null);
  }
  
updateProductImage(productId: any, files: File[]): Observable<any> {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  return this.http.put(`http://localhost:8080/app/product/update/images?productId=${productId}`, formData);
}


  
}
