import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Service>(
      `${this.apiUrl}/${slug}`
    );
  }
}