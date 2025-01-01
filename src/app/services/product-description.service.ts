import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDescriptionService {

  private apiUrl = 'https://api.example.com/cards'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all cards
  getAllCards(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a single card by ID
  getCardById(cardId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cardId}`);
  }
}
