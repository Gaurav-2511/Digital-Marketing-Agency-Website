import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicWebsiteSettingApi } from '../../core/services/public-website-setting-api';

@Component({
  selector: 'app-footer',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  currentYear: number = new Date().getFullYear();
  private readonly websiteSettingApi = inject(PublicWebsiteSettingApi);

  readonly settings$ = this.websiteSettingApi.getSettings();
}