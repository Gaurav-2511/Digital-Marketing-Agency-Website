import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WebsiteSetting, WebsiteSettingRequest } from '../models/website-setting.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminWebsiteSettingApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/admin/settings';

  getSettings(): Observable<WebsiteSetting> {
    return this.http.get<WebsiteSetting>(this.apiUrl);
  }

  updateSettings(request: WebsiteSettingRequest): Observable<WebsiteSetting> {
    return this.http.put<WebsiteSetting>(this.apiUrl, request);
  }
}
