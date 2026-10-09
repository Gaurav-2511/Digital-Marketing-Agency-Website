import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BlogCategory, BlogCategoryRequest } from '../models/blog-category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminBlogCategoryApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/admin/blog-categories';

  getAllCategories(): Observable<BlogCategory[]> {
    return this.http.get<BlogCategory[]>(this.apiUrl);
  }

  createCategory(request: BlogCategoryRequest): Observable<BlogCategory> {
    return this.http.post<BlogCategory>(this.apiUrl, request);
  }

  updateCategory(id: number, request: BlogCategoryRequest): Observable<BlogCategory> {
    return this.http.put<BlogCategory>(`${this.apiUrl}/${id}`, request);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCategoryStatus(id: number, active: boolean): Observable<BlogCategory> {
    return this.http.patch<BlogCategory>(
      `${this.apiUrl}/${id}/status`,
      {},
      {
        params: { active: String(active) },
      },
    );
  }
}
