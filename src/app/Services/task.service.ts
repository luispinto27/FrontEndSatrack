import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../Interfaces/task';

@Injectable()
export class TaskService {

  private endPoint: string = "https://localhost:7157/api/";
  private apiUrl: string = this.endPoint + "task/";

  constructor(private http: HttpClient) { }

  getAllTasks():Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}Get`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}Create`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}Update/`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Delete/${taskId}`);
  }

  completedTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}Completed/${taskId}`);
  }

  asignedCategory(taskId: number, categoryId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}Asigned/${taskId}/${categoryId}`);
  }

  asignedDateLimited(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}AsignedDateLimited/`, task);
  }

}
