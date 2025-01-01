import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'https://api.example.com/orders'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all orders
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Assign a delivery agent to an order
  assignDeliveryAgent(orderId: string, agentId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}/assign`, { agentId });
  }
}
