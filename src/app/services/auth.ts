import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  // Signup
  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'signup/', {
      username,
      email,
      password
    });
  }

  // Login (ONLY username + password)
  // ✅ Login
login(username: string, email: string, password: string) {
  return this.http.post(this.baseUrl + 'login/', {
    username: username,
    email: email,
    password: password
  });
}

  // Store Tokens
  saveTokens(response: any) {
    localStorage.setItem('access', response.access);
    localStorage.setItem('refresh', response.refresh);
  }

  // Get Auth Header
  private getAuthHeaders() {
    const token = localStorage.getItem('access');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get User Info
  getUserInfo(): Observable<any> {
    return this.http.get(this.baseUrl + 'user/', {
      headers: this.getAuthHeaders()
    });
  }

  // Check Logged In
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access');
  }

  // Logout
  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
