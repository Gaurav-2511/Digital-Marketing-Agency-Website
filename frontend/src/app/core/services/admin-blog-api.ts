import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog, BlogRequest } from '../models/blog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminBlogApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/admin/blogs';

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  createBlog(request: BlogRequest): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, request);
  }

  updateBlog(id: number, request: BlogRequest): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, request);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateBlogStatus(id: number, published: boolean): Observable<Blog> {
    return this.http.patch<Blog>(
      `${this.apiUrl}/${id}/status`,
      {},
      { params: { published: String(published) } },
    );
  }
}
