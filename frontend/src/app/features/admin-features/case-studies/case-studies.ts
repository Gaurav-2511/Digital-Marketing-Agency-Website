import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminCaseStudyApi } from '../../../core/services/admin-case-study-api';
import { CaseStudy, CaseStudyRequest } from '../../../core/models/case-study.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-case-studies',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './case-studies.html',
  styleUrl: './case-studies.css',
})
export class CaseStudies implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly caseStudyApi = inject(AdminCaseStudyApi);
  private readonly cdr = inject(ChangeDetectorRef);

  caseStudies: CaseStudy[] = [];

  isLoading = false;
  isSubmitting = false;

  errorMessage = '';
  successMessage = '';

  showAddForm = false;

  editingCaseStudyId: number | null = null;
  isEditMode = false;

  deletingCaseStudyId: number | null = null;
  updatingStatusId: number | null = null;

  searchTerm = '';

  statusFilter: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';

  caseStudyForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],

    slug: ['', [Validators.required, Validators.maxLength(180)]],

    shortDescription: ['', [Validators.required, Validators.maxLength(300)]],

    description: ['', [Validators.required]],

    clientName: ['', [Validators.maxLength(150)]],

    industry: ['', [Validators.required, Validators.maxLength(100)]],

    challenge: ['', [Validators.required]],

    solution: ['', [Validators.required]],

    results: ['', [Validators.required]],

    imageUrl: ['', [Validators.maxLength(500)]],

    projectUrl: ['', [Validators.maxLength(500)]],

    active: [true],
  });

  ngOnInit(): void {
    this.loadCaseStudies();
  }

  loadCaseStudies(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.caseStudyApi
      .getAllCaseStudies()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (data) => {
          this.caseStudies = data;
        },

        error: (error) => {
          console.error('Case Study API error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to manage case studies.';
          } else {
            this.errorMessage = 'Failed to load case studies.';
          }
        },
      });
  }

  openAddForm(): void {
    this.resetForm();

    this.showAddForm = true;
    this.isEditMode = false;
    this.editingCaseStudyId = null;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  editCaseStudy(caseStudy: CaseStudy): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.showAddForm = true;
    this.isEditMode = true;
    this.editingCaseStudyId = caseStudy.id;

    this.caseStudyForm.patchValue({
      title: caseStudy.title ?? '',

      slug: caseStudy.slug ?? '',

      shortDescription: caseStudy.shortDescription ?? '',

      description: caseStudy.description ?? '',

      clientName: caseStudy.clientName ?? '',

      industry: caseStudy.industry ?? '',

      challenge: caseStudy.challenge ?? '',

      solution: caseStudy.solution ?? '',

      results: caseStudy.results ?? '',

      imageUrl: caseStudy.imageUrl ?? '',

      projectUrl: caseStudy.projectUrl ?? '',

      active: caseStudy.active,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  cancelForm(): void {
    this.showAddForm = false;

    this.isEditMode = false;

    this.editingCaseStudyId = null;

    this.resetForm();
  }

  submitForm(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.caseStudyForm.invalid) {
      this.caseStudyForm.markAllAsTouched();

      return;
    }

    const request: CaseStudyRequest = this.caseStudyForm.getRawValue();

    this.isSubmitting = true;

    if (this.isEditMode && this.editingCaseStudyId !== null) {
      this.caseStudyApi
        .updateCaseStudy(this.editingCaseStudyId, request)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
          }),
        )
        .subscribe({
          next: () => {
            this.successMessage = 'Case study updated successfully.';

            this.cancelForm();

            this.loadCaseStudies();
          },

          error: (error) => {
            this.handleFormError(error, 'Failed to update case study.');
          },
        });

      return;
    }

    this.caseStudyApi
      .createCaseStudy(request)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Case study created successfully.';

          this.cancelForm();

          this.loadCaseStudies();
        },

        error: (error) => {
          this.handleFormError(error, 'Failed to create case study.');
        },
      });
  }

  deleteCaseStudy(caseStudy: CaseStudy): void {
    const confirmed = window.confirm(`Are you sure you want to delete "${caseStudy.title}"?`);

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.deletingCaseStudyId = caseStudy.id;

    this.caseStudyApi
      .deleteCaseStudy(caseStudy.id)
      .pipe(
        finalize(() => {
          this.deletingCaseStudyId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Case study deleted successfully.';

          this.loadCaseStudies();
        },

        error: (error) => {
          console.error('Delete case study error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to delete case studies.';
          } else if (error.status === 404) {
            this.errorMessage = 'Case study not found.';
          } else {
            this.errorMessage = 'Failed to delete case study.';
          }
        },
      });
  }

  toggleStatus(caseStudy: CaseStudy): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.updatingStatusId = caseStudy.id;

    const newStatus = !caseStudy.active;

    this.caseStudyApi
      .updateCaseStudyStatus(caseStudy.id, newStatus)
      .pipe(
        finalize(() => {
          this.updatingStatusId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = `Case study ${
            newStatus ? 'activated' : 'deactivated'
          } successfully.`;

          this.loadCaseStudies();
        },

        error: (error) => {
          console.error('Case study status update error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to update case study status.';
          } else if (error.status === 404) {
            this.errorMessage = 'Case study not found.';
          } else {
            this.errorMessage = 'Failed to update case study status.';
          }
        },
      });
  }

  get filteredCaseStudies(): CaseStudy[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.caseStudies.filter((caseStudy) => {
      const title = (caseStudy.title ?? '').toLowerCase();

      const clientName = (caseStudy.clientName ?? '').toLowerCase();

      const industry = (caseStudy.industry ?? '').toLowerCase();

      const matchesSearch =
        !search ||
        title.includes(search) ||
        clientName.includes(search) ||
        industry.includes(search);

      const matchesStatus =
        this.statusFilter === 'ALL' ||
        (this.statusFilter === 'ACTIVE' && caseStudy.active) ||
        (this.statusFilter === 'INACTIVE' && !caseStudy.active);

      return matchesSearch && matchesStatus;
    });
  }

  private resetForm(): void {
    this.caseStudyForm.reset({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      clientName: '',
      industry: '',
      challenge: '',
      solution: '',
      results: '',
      imageUrl: '',
      projectUrl: '',
      active: true,
    });

    this.caseStudyForm.markAsPristine();
    this.caseStudyForm.markAsUntouched();

    this.errorMessage = '';
  }

  private handleFormError(error: any, defaultMessage: string): void {
    console.error('Case study form error:', error);

    if (error.status === 400) {
      this.errorMessage = 'Please check the entered case study details.';
    } else if (error.status === 401) {
      this.errorMessage = 'Session expired. Please login again.';
    } else if (error.status === 403) {
      this.errorMessage = 'You are not authorized to perform this action.';
    } else if (error.status === 404) {
      this.errorMessage = 'Case study not found.';
    } else if (error.status === 409) {
      this.errorMessage = 'A case study with the same slug already exists.';
    } else {
      this.errorMessage = defaultMessage;
    }
  }
}
