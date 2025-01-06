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

  

  // Fetch all delivery agents
  getAllDeliveryAgents(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/deliveryAgents?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}