import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://api.example.com/customers';// URL to web api bad ma dalna hai 

   constructor(private http: HttpClient) { }
  
   getAllCustomers(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/app/customers?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  fetchCustomerAddress(customerId: any) {
    return this.http.get(`http://localhost:8080/app/customer/address?customerId=${customerId}`);
  }
  editProfile(userName: any, data: any){
    console.log(data);
    console.log(userName);
    return this.http.put(`http://localhost:8080/app/customer/update/${userName}`, data);
  }

  fetchCustomerDetails(userName: string) {
    return this.http.get(`http://localhost:8080/app/customerByUserName?userName=${userName}`);
  }

  deleteCustomerById(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/app/customer/delete?customerId=${id}`);
  }

  

  // Get customer by ID
  getCustomerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
