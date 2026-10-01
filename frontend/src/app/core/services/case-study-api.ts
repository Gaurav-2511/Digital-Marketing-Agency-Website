import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CaseStudy } from '../models/case-study.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaseStudyApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/case-studies';

  getActiveCaseStudies(): Observable<CaseStudy[]> {
    return this.http.get<CaseStudy[]>(this.apiUrl);
  }

  getCaseStudyById(id: number): Observable<CaseStudy> {
    return this.http.get<CaseStudy>(`${this.apiUrl}/${id}`);
  }

  getCaseStudyBySlug(slug: string): Observable<CaseStudy> {
    return this.http.get<CaseStudy>(
      `${this.apiUrl}/slug/${slug}`
    );
  }

  getCaseStudiesByIndustry(industry: string): Observable<CaseStudy[]> {
    return this.http.get<CaseStudy[]>(
      `${this.apiUrl}/industry/${industry}`
    );
  }
}
