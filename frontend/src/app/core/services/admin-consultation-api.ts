import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Consultation,
  ConsultationScheduleRequest,
  ConsultationStatus,
  ConsultationStatusUpdateRequest,
} from '../models/consultation.model';

@Injectable({
  providedIn: 'root',
})
export class AdminConsultationApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/admin/consultations';

  getAllConsultations(status?: ConsultationStatus): Observable<Consultation[]> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Consultation[]>(this.apiUrl, { params });
  }

  getConsultationById(id: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: ConsultationStatus): Observable<Consultation> {
    const body: ConsultationStatusUpdateRequest = { status };

    return this.http.patch<Consultation>(`${this.apiUrl}/${id}/status`, body);
  }

  scheduleConsultation(id: number, request: ConsultationScheduleRequest): Observable<Consultation> {
    return this.http.patch<Consultation>(`${this.apiUrl}/${id}/schedule`, request);
  }

  deleteConsultation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
