import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAgentService {

  private apiUrl = 'https://api.example.com/delivery-agents'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Add a new delivery agent
  addDeliveryAgent(agentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, agentData);
  }

  private apiUrl1 = 'https://api.example.com/delivery-agents'; // Replace with your actual API URL


  // Fetch all delivery agents
  getAllDeliveryAgents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Delete a delivery agent
  deleteDeliveryAgent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl1}/${id}`);
  }

 
}
