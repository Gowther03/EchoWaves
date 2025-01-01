import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8080/practiceApi/login";
  registerCustomerUrl = "http://localhost:8080/practiceApi/customerRegister";
  constructor(private http: HttpClient) { }

  signIn(signInData: any): Observable<any> {
    return this.http.post(this.url, signInData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post(this.registerCustomerUrl, registerData);
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
