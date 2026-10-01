import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Portfolio } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioApi {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/portfolio';

  getActivePortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.apiUrl);
  }

  getPortfolioById(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiUrl}/${id}`);
  }

  getPortfolioBySlug(slug: string): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiUrl}/slug/${slug}`);
  }

  getPortfoliosByCategory(category: string): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(
      `${this.apiUrl}/category/${category}`
    );
  }
}