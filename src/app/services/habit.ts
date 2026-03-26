import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Habit {
  id: number;
  title: string;
  description: string;
  frequency: string;
  plant_stage: number;
  streak: number;
  total_completions: number;
  last_completed: string;
}

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  private apiUrl = 'http://127.0.0.1:8000/api/habits/';

  constructor(private http: HttpClient) {}

  // 🔐 Auth Header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access'); // ✅ FIXED

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // 🌱 GET ALL HABITS (VERY IMPORTANT)
  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(
      this.apiUrl,
      { headers: this.getAuthHeaders() }
    );
  }

  // 🌱 GET SINGLE HABIT
  getHabit(id: number): Observable<Habit> {
    return this.http.get<Habit>(
      `${this.apiUrl}${id}/`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ➕ ADD HABIT
  addHabit(data: any): Observable<Habit> {
    return this.http.post<Habit>(
      this.apiUrl,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  // ✅ COMPLETE HABIT
  completeHabit(id: number): Observable<Habit> {
    return this.http.post<Habit>(
      `${this.apiUrl}${id}/complete/`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  // ❌ DELETE HABIT
  deleteHabit(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}${id}/`,
      { headers: this.getAuthHeaders() }
    );
  }

}
