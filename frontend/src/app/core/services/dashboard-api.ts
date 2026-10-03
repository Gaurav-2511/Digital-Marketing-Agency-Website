import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/admin/dashboard';

  getDashboardStatistics(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.apiUrl);

  }
}
