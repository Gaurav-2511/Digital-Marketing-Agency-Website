import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LeadApi } from '../../../core/services/lead-api';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly leadApi = inject(LeadApi);

  constructor(private cdr: ChangeDetectorRef) {}

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    email: ['', [Validators.required, Validators.email]],

    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],

    company: ['', [Validators.maxLength(150)]],

    service: ['', [Validators.required]],

    budget: ['', [Validators.required]],

    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  onSubmit(): void {
    this.submitSuccess = false;
    this.submitError = false;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();

      return;
    }

    this.isSubmitting = true;

    const lead = this.contactForm.getRawValue();

    console.log('Submitting Lead:', lead);

    this.leadApi.createLead(lead).subscribe({
      next: (response) => {
        console.log('Lead Created Successfully:', response);

        this.isSubmitting = false;
        this.submitSuccess = true;
        this.submitError = false;

        this.contactForm.reset();

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Lead Submission Error:', error);

        this.isSubmitting = false;
        this.submitSuccess = false;
        this.submitError = true;

        this.cdr.detectChanges();
      },
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);

    return !!(field && field.invalid && field.touched);
  }
}
