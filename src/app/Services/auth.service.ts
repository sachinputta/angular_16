import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';

  // private baseUrl = 'https://taxapp1-9e3fb338382d.herokuapp.com';

  constructor(private http: HttpClient, private router: Router) { }

  // login(customerId: string, customerPassword: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/login`, { customerId, customerPassword });
  // }

  // storeToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // clearToken(): void {
  //   localStorage.removeItem('token');
  // }

  // storeCustomerId(customerId: string): void {
  //   localStorage.setItem('customerId', customerId);
  // }

  // getCustomerId(): string | null {
  //   return localStorage.getItem('customerId');
  // }

  // getUserRole(): string {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   return user?.role || '';
  // }

  // getAuthHeaders(): HttpHeaders {
  //   const token = this.getToken();
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  // }

  // isTokenExpired(): boolean {
  //   const token = localStorage.getItem('token');
  //   if (!token) return true;

  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     const now = Math.floor(Date.now() / 1000); // current time in seconds
  //     return payload.exp < now;
  //   } catch (e) {
  //     return true; // If token is malformed, treat as expired
  //   }
  // }

  // logout(): void {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('role');
  // }


  //---------------


  login(customerId: string, customerPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { customerId, customerPassword });
  }

  storeToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  clearToken(): void {
    sessionStorage.removeItem('token');
  }

  storeCustomerId(customerId: string): void {
    sessionStorage.setItem('customerId', customerId);
  }

  getCustomerId(): string | null {
    return sessionStorage.getItem('customerId');
  }

  getUserRole(): string {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return user?.role || '';
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  isTokenExpired(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000); // current time in seconds
      return payload.exp < now;
    } catch (e) {
      return true; // If token is malformed, treat as expired
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  }



}
