import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PublicWebsiteSetting } from '../models/public-website-setting.model';
import { catchError, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicWebsiteSettingApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/public/settings';

  private settingsRequest$: Observable<PublicWebsiteSetting> | null = null;

  private readonly fallbackSettings: PublicWebsiteSetting = {
    agencyName: 'Digital Marketing Agency',
    tagline: null,
    logoUrl: null,
    contactEmail: 'info@example.com',
    phone: null,
    address: 'Maharashtra, India',
    facebookUrl: null,
    instagramUrl: null,
    linkedinUrl: null,
    youtubeUrl: null,
    defaultMetaTitle: null,
    defaultMetaDescription: null,
    footerText: null,
  };

  getSettings(): Observable<PublicWebsiteSetting> {
    if (!this.settingsRequest$) {
      this.settingsRequest$ = this.http
        .get<PublicWebsiteSetting>(this.apiUrl)
        .pipe(
          catchError((error: unknown) => {
            console.error('Failed to load public website settings.', error);
            return of(this.fallbackSettings);
          }),
          shareReplay({ bufferSize: 1, refCount: false }),
        );
    }

    return this.settingsRequest$;
  }
}
