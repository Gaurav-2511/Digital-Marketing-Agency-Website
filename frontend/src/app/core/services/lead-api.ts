import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lead, LeadRequest } from '../models/lead.model';

@Injectable({
  providedIn: 'root',
})
export class LeadApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/leads';

  createLead(lead: LeadRequest): Observable<Lead> {

    return this.http.post<Lead>(
      this.apiUrl,
      lead
    );
  }
}
