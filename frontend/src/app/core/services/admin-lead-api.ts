import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lead, LeadStatus } from '../models/lead.model';

@Injectable({
  providedIn: 'root',
})
export class AdminLeadApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/admin/leads';

  getAllLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl);
  }

  getLeadById(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/${id}`);
  }

  getLeadsByStatus(status: LeadStatus): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.apiUrl}/status/${status}`);
  }

  updateLeadStatus(id: number, status: LeadStatus): Observable<Lead> {
    const params = new HttpParams().set('status' , status);

    return this.http.patch<Lead>(`${this.apiUrl}/${id}/status`, {}, { params });
  }

  deleteLead(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
