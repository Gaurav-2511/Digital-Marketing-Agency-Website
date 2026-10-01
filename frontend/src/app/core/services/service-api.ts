import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/services';

  getActiveServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  getServiceBySlug(slug: string): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${slug}`);
  }
}