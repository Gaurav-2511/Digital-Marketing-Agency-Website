import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Testimonial, TestimonialRequest } from '../models/testimonial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminTestimonialApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/admin/testimonials';

  createTestimonial(request: TestimonialRequest): Observable<Testimonial> {
    return this.http.post<Testimonial>(this.apiUrl, request);
  }

  getAllTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.apiUrl);
  }

  getTestimonialById(id: number): Observable<Testimonial> {
    return this.http.get<Testimonial>(`${this.apiUrl}/${id}`);
  }

  updateTestimonial(id: number, request: TestimonialRequest): Observable<Testimonial> {
    return this.http.put<Testimonial>(`${this.apiUrl}/${id}`, request);
  }

  deleteTestimonial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTestimonialStatus(id: number, active: boolean): Observable<Testimonial> {
    return this.http.patch<Testimonial>(`${this.apiUrl}/${id}/status`, null, {
      params: {
        active: active.toString(),
      },
    });
  }
}
