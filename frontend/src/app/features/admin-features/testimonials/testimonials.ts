import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminTestimonialApi } from '../../../core/services/admin-testimonial-api';
import { Testimonial, TestimonialRequest } from '../../../core/models/testimonial.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-testimonials',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly testimonialApi = inject(AdminTestimonialApi);
  private readonly cdr = inject(ChangeDetectorRef);

  testimonials: Testimonial[] = [];

  isLoading = false;
  isSubmitting = false;

  errorMessage = '';
  successMessage = '';

  showAddForm = false;

  editingTestimonialId: number | null = null;
  isEditMode = false;

  deletingTestimonialId: number | null = null;
  updatingStatusId: number | null = null;

  searchTerm = '';

  statusFilter: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';

  testimonialForm = this.fb.nonNullable.group({
    clientName: ['', [Validators.required, Validators.maxLength(150)]],
    clientRole: ['', [Validators.maxLength(150)]],
    companyName: ['', [Validators.maxLength(150)]],
    content: ['', [Validators.required]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    imageUrl: ['', [Validators.maxLength(500)]],
    active: [true],
  });

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.testimonialApi
      .getAllTestimonials()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (data) => {
          this.testimonials = data;
        },

        error: (error) => {
          console.error('Testimonial API error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to manage testimonials.';
          } else {
            this.errorMessage = 'Failed to load testimonials.';
          }
        },
      });
  }

  openAddForm(): void {
    this.resetForm();

    this.showAddForm = true;
    this.isEditMode = false;
    this.editingTestimonialId = null;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  editTestimonial(testimonial: Testimonial): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.showAddForm = true;
    this.isEditMode = true;
    this.editingTestimonialId = testimonial.id;

    this.testimonialForm.patchValue({
      clientName: testimonial.clientName ?? '',
      clientRole: testimonial.clientRole ?? '',
      companyName: testimonial.companyName ?? '',
      content: testimonial.content ?? '',
      rating: testimonial.rating ?? 5,
      imageUrl: testimonial.imageUrl ?? '',
      active: testimonial.active,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  cancelForm(): void {
    this.showAddForm = false;
    this.isEditMode = false;
    this.editingTestimonialId = null;

    this.resetForm();
  }

  submitForm(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.testimonialForm.invalid) {
      this.testimonialForm.markAllAsTouched();
      return;
    }

    const request: TestimonialRequest = this.testimonialForm.getRawValue();

    this.isSubmitting = true;

    if (this.isEditMode && this.editingTestimonialId !== null) {
      this.testimonialApi
        .updateTestimonial(this.editingTestimonialId, request)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
          }),
        )
        .subscribe({
          next: () => {
            this.successMessage = 'Testimonial updated successfully.';

            this.cancelForm();
            this.loadTestimonials();
          },

          error: (error) => {
            this.handleFormError(error, 'Failed to update testimonial.');
          },
        });

      return;
    }

    this.testimonialApi
      .createTestimonial(request)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Testimonial created successfully.';

          this.cancelForm();
          this.loadTestimonials();
        },

        error: (error) => {
          this.handleFormError(error, 'Failed to create testimonial.');
        },
      });
  }

  deleteTestimonial(testimonial: Testimonial): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${testimonial.clientName}"'s testimonial?`,
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.deletingTestimonialId = testimonial.id;

    this.testimonialApi
      .deleteTestimonial(testimonial.id)
      .pipe(
        finalize(() => {
          this.deletingTestimonialId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Testimonial deleted successfully.';

          this.loadTestimonials();
        },

        error: (error) => {
          console.error('Delete testimonial error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to delete testimonials.';
          } else if (error.status === 404) {
            this.errorMessage = 'Testimonial not found.';
          } else {
            this.errorMessage = 'Failed to delete testimonial.';
          }
        },
      });
  }

  toggleStatus(testimonial: Testimonial): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.updatingStatusId = testimonial.id;

    const newStatus = !testimonial.active;

    this.testimonialApi
      .updateTestimonialStatus(testimonial.id, newStatus)
      .pipe(
        finalize(() => {
          this.updatingStatusId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = `Testimonial ${
            newStatus ? 'activated' : 'deactivated'
          } successfully.`;

          this.loadTestimonials();
        },

        error: (error) => {
          console.error('Testimonial status update error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to update testimonial status.';
          } else if (error.status === 404) {
            this.errorMessage = 'Testimonial not found.';
          } else {
            this.errorMessage = 'Failed to update testimonial status.';
          }
        },
      });
  }

  get filteredTestimonials(): Testimonial[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.testimonials.filter((testimonial) => {
      const clientName = (testimonial.clientName ?? '').toLowerCase();

      const clientRole = (testimonial.clientRole ?? '').toLowerCase();

      const companyName = (testimonial.companyName ?? '').toLowerCase();

      const matchesSearch =
        !search ||
        clientName.includes(search) ||
        clientRole.includes(search) ||
        companyName.includes(search);

      const matchesStatus =
        this.statusFilter === 'ALL' ||
        (this.statusFilter === 'ACTIVE' && testimonial.active) ||
        (this.statusFilter === 'INACTIVE' && !testimonial.active);

      return matchesSearch && matchesStatus;
    });
  }

  private resetForm(): void {
    this.testimonialForm.reset({
      clientName: '',
      clientRole: '',
      companyName: '',
      content: '',
      rating: 5,
      imageUrl: '',
      active: true,
    });

    this.testimonialForm.markAsPristine();
    this.testimonialForm.markAsUntouched();

    this.errorMessage = '';
  }

  private handleFormError(error: any, defaultMessage: string): void {
    console.error('Testimonial form error:', error);

    if (error.status === 400) {
      this.errorMessage = 'Please check the entered testimonial details.';
    } else if (error.status === 401) {
      this.errorMessage = 'Session expired. Please login again.';
    } else if (error.status === 403) {
      this.errorMessage = 'You are not authorized to perform this action.';
    } else if (error.status === 404) {
      this.errorMessage = 'Testimonial not found.';
    } else {
      this.errorMessage = defaultMessage;
    }
  }
}
