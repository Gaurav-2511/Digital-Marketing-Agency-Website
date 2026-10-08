import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Portfolio, PortfolioRequest } from '../models/portfolio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPortfolioApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/admin/portfolio';

  createPortfolio(request: PortfolioRequest): Observable<Portfolio> {
    return this.http.post<Portfolio>(this.apiUrl, request);
  }

  getAllPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.apiUrl);
  }

  getPortfolioById(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiUrl}/${id}`);
  }

  updatePortfolio(id: number, request: PortfolioRequest): Observable<Portfolio> {
    return this.http.put<Portfolio>(`${this.apiUrl}/${id}`,
      request
    );
  }

  deletePortfolio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updatePortfolioStatus(id: number, active: boolean): Observable<Portfolio> {
    return this.http.patch<Portfolio>(`${this.apiUrl}/${id}/status`, null, {
      params: {
        active: active.toString(),
      },
    }
    );
  }
}
