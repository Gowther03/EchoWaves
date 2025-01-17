import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8080/api/login";
  registerCustomerUrl = "http://localhost:8080/api/customerRegister";
  constructor(private http: HttpClient) { }

  signIn(signInData: any): Observable<any> {
    return this.http.post(this.url, signInData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post(this.registerCustomerUrl, registerData);
  }

  // getAllEMails(): Observable<any[]> {
  //   return this.http.get<any[]>(`http://localhost:8080/api/customers/emails`);
  // }

  checkEmail(email: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/customers/check-email?email=${email}`);
  }

  requestCredentials(email: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/customer/credentials?email=${email}`);
  }

  
  

  isLoggedIn(): boolean {
    // Check if a token exists in localStorage
    return !!localStorage.getItem('token');
  }

  login(token: string): void {
    localStorage.setItem('token', token); // Store the token in localStorage
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token on logout
  }
}
