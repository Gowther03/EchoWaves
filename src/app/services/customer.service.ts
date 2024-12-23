import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 getAllCustomersUrl = "http://localhost:8080/practiceApp/customers";
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
}
