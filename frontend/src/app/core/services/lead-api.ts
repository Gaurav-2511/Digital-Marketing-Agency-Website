import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lead } from '../models/lead.model';

@Injectable({
  providedIn: 'root',
})
export class LeadApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/leads';

  createLead(lead: Lead): Observable<unknown> {

    return this.http.post<unknown>(
      this.apiUrl,
      lead
    );
  }
}
