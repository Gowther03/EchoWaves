import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://api.example.com/customers';// URL to web api bad ma dalna hai 

 getAllCustomersUrl = "http://localhost:8080/app/customers";
   constructor(private http: HttpClient) { }
  
  getAllCustomers(){
    return this.http.get(this.getAllCustomersUrl);
  }

  editProfile(userName: any, data: any){
    return this.http.put(`/practiceApp/customer/${userName}/EditProfile`, data);
  }

  fetchCustomerDetails(userName: string) {
    return this.http.get(`/practiceApp/customer?userName=${userName}`);
  }

  deleteCustomerById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  

  // Get customer by ID
  getCustomerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
