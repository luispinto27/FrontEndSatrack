import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../Interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private endPoint: string = "https://localhost:7157/api/";
  private apiUrl: string = this.endPoint + "category/";

  constructor(private http: HttpClient) { }

  getAllCategory():Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}Get`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}Create`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}Update/`, category);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Delete/${categoryId}`);
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}GetById/${categoryId}`);
  }
}
