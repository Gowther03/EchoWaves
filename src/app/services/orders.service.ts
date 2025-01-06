import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl:any="http://localhost:8080/app/orders" // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all orders
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  placeOrder(cartId: any, userName: any): Observable<any> {
    return this.http.post(`http://localhost:8080/app/placeOrder?cartId=${cartId}&userName=${userName}`, {});
  }

  // Assign a delivery agent to an order
  assignDeliveryAgent(orderId: string, agentId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}/assign`, { agentId });
  }

  getAllOrdersOfCustomer(userName: any, pageNumber: number, pageSize: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/app/orders/${userName}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
