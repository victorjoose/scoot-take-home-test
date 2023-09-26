import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createTodo(todo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/todos`, todo);
  }

  editTodo(id: string, todo: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/todos/${id}`, todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }

  getTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/todos`);
  }
}
