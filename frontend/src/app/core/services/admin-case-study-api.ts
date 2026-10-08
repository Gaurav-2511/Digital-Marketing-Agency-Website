import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CaseStudy, CaseStudyRequest } from '../models/case-study.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminCaseStudyApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/admin/case-studies';

  createCaseStudy(request: CaseStudyRequest): Observable<CaseStudy> {
    return this.http.post<CaseStudy>(this.apiUrl, request);
  }

  getAllCaseStudies(): Observable<CaseStudy[]> {
    return this.http.get<CaseStudy[]>(this.apiUrl);
  }

  getCaseStudyById(id: number): Observable<CaseStudy> {
    return this.http.get<CaseStudy>(`${this.apiUrl}/${id}`);
  }

  updateCaseStudy(id: number, request: CaseStudyRequest): Observable<CaseStudy> {
    return this.http.put<CaseStudy>(`${this.apiUrl}/${id}`, request);
  }

  deleteCaseStudy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCaseStudyStatus(id: number, active: boolean): Observable<CaseStudy> {
    return this.http.patch<CaseStudy>(`${this.apiUrl}/${id}/status`, null, {
      params: {
        active: active.toString(),
      },
    });
  }
}
