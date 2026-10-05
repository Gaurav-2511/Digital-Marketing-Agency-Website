import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { Observable } from 'rxjs';
import { ServiceRequest } from '../models/service-request';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/admin/services';

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }

  createService(service: ServiceRequest): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, service);
  }

  updateService(id: number, service: ServiceRequest): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/${id}`, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateServiceStatus(id: number, active: boolean): Observable<Service> {
    return this.http.patch<Service>(`${this.apiUrl}/${id}/status`,{},
      {
        params: { active: String(active) },
      },
    );
  }
}
