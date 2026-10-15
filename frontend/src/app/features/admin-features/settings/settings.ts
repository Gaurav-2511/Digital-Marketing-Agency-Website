import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AdminWebsiteSettingApi } from '../../../core/services/admin-website-setting-api';
import { WebsiteSettingRequest } from '../../../core/models/website-setting.model';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  private readonly api = inject(AdminWebsiteSettingApi);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  isLoading = false;
  isSaving = false;

  errorMessage = '';
  successMessage = '';

  private readonly urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

  readonly settingsForm = this.fb.nonNullable.group({
    agencyName: ['Digital Marketing Agency', [Validators.required, Validators.maxLength(150)]],
    tagline: ['', Validators.maxLength(300)],
    logoUrl: ['', [Validators.maxLength(500), Validators.pattern(this.urlPattern)]],
    contactEmail: ['', [Validators.email, Validators.maxLength(150)]],
    phone: ['', Validators.maxLength(30)],
    address: ['', Validators.maxLength(500)],
    facebookUrl: ['', [Validators.maxLength(500), Validators.pattern(this.urlPattern)]],
    instagramUrl: ['', [Validators.maxLength(500), Validators.pattern(this.urlPattern)]],
    linkedinUrl: ['', [Validators.maxLength(500), Validators.pattern(this.urlPattern)]],
    youtubeUrl: ['', [Validators.maxLength(500), Validators.pattern(this.urlPattern)]],
    defaultMetaTitle: ['', Validators.maxLength(200)],
    defaultMetaDescription: ['', Validators.maxLength(500)],
    footerText: ['', Validators.maxLength(500)],
  });

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.api
      .getSettings()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (settings) => {
          this.settingsForm.reset({
            agencyName: settings.agencyName ?? '',
            tagline: settings.tagline ?? '',
            logoUrl: settings.logoUrl ?? '',
            contactEmail: settings.contactEmail ?? '',
            phone: settings.phone ?? '',
            address: settings.address ?? '',
            facebookUrl: settings.facebookUrl ?? '',
            instagramUrl: settings.instagramUrl ?? '',
            linkedinUrl: settings.linkedinUrl ?? '',
            youtubeUrl: settings.youtubeUrl ?? '',
            defaultMetaTitle: settings.defaultMetaTitle ?? '',
            defaultMetaDescription: settings.defaultMetaDescription ?? '',
            footerText: settings.footerText ?? '',
          });
        },
        error: (error) => {
          console.error('Load website settings error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please log in again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to access website settings.';
          } else {
            this.errorMessage = 'Failed to load settings. Please try again.';
          }
        },
      });
  }

  saveSettings(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      this.errorMessage = 'Please correct the validation errors before saving.';
      return;
    }

    const request: WebsiteSettingRequest = this.settingsForm.getRawValue();

    this.isSaving = true;

    this.api
      .updateSettings(request)
      .pipe(
        finalize(() => {
          this.isSaving = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (settings) => {
          this.settingsForm.reset({
            agencyName: settings.agencyName ?? '',
            tagline: settings.tagline ?? '',
            logoUrl: settings.logoUrl ?? '',
            contactEmail: settings.contactEmail ?? '',
            phone: settings.phone ?? '',
            address: settings.address ?? '',
            facebookUrl: settings.facebookUrl ?? '',
            instagramUrl: settings.instagramUrl ?? '',
            linkedinUrl: settings.linkedinUrl ?? '',
            youtubeUrl: settings.youtubeUrl ?? '',
            defaultMetaTitle: settings.defaultMetaTitle ?? '',
            defaultMetaDescription: settings.defaultMetaDescription ?? '',
            footerText: settings.footerText ?? '',
          });

          this.successMessage = 'Website settings saved successfully.';
        },
        error: (error) => {
          console.error('Save website settings error:', error);

          if (error.status === 400) {
            this.errorMessage = error.error?.message || 'Please check the settings and try again.';
          } else if (error.status === 401) {
            this.errorMessage = 'Session expired. Please log in again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to update website settings.';
          } else {
            this.errorMessage = 'Failed to save settings. Please try again.';
          }
        },
      });
  }

  getFieldError(field: string): string {
    const control = this.settingsForm.get(field);

    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.hasError('required')) {
      return 'This field is required.';
    }

    if (control.hasError('email')) {
      return 'Enter a valid email address.';
    }

    if (control.hasError('pattern')) {
      return 'Enter a valid URL starting with http:// or https://.';
    }

    if (control.hasError('maxlength')) {
      return 'The entered value exceeds the allowed length.';
    }

    return 'Please enter a valid value.';
  }
}
