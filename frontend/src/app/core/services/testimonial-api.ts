import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Testimonial } from '../models/testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/testimonials';

  getActiveTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.apiUrl);
  }

  getTestimonialById(id: number): Observable<Testimonial> {
    return this.http.get<Testimonial>(`${this.apiUrl}/${id}`);
  }
}