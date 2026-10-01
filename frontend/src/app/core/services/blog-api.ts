import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog } from '../../features/blog/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogApi {
    private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/blogs';

  getPublishedBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getPublishedBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  getPublishedBlogBySlug(slug: string): Observable<Blog> {
    return this.http.get<Blog>(
      `${this.apiUrl}/slug/${slug}`
    );
  }

  getPublishedBlogsByCategory(categoryId: number): Observable<Blog[]> {
    return this.http.get<Blog[]>(
      `${this.apiUrl}/category/${categoryId}`
    );
  }
}
