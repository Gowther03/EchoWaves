import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAgentService {
  deleteDeliveryAgent(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/app/deliveryAgent/delete?agentId=${id}`);
  }

  
  constructor(private http: HttpClient) {}

  // Add a new delivery agent
  addDeliveryAgent(agentData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/app/deliveryAgentRegister`, agentData);
  }


  getOrdersOfAgent(userName: any, pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/app/deliveryAgent/orders/${userName}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getOrdersByDateRange(userName: any, fromDate: string, toDate: string, page: number, size: number) {
    return this.http.get<any>(`/api/orders/customer/dateRange`, {
      params: {
        userName,
        fromDate,
        toDate,
        pageNumber: page.toString(),
        pageSize: size.toString(),
      },
    });
  }
  
  changeStatus(orderId: number, status: string): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/app/deliveryAgent/order/update?orderId=${orderId}&status=${status}`, {});
  }

  getAddressOfCustomer(orderId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/deliveryAgent/order/address?orderId=${orderId}`);
  }
  // Fetch all delivery agents
  getAllDeliveryAgents(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/deliveryAgents?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  
}