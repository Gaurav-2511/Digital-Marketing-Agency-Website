import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PublicWebsiteSettingApi } from '../../core/services/public-website-setting-api';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly websiteSettingApi = inject(PublicWebsiteSettingApi);

  readonly settings$ = this.websiteSettingApi.getSettings();

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}