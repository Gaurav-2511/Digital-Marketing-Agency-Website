import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AdminPortfolioApi } from '../../../core/services/admin-portfolio-api';
import {
  Portfolio as PortfolioModel,
  PortfolioRequest,
} from '../../../core/models/portfolio.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly portfolioApi = inject(AdminPortfolioApi);
  private readonly cdr = inject(ChangeDetectorRef);

  portfolios: PortfolioModel[] = [];

  isLoading = false;
  isSubmitting = false;

  errorMessage = '';
  successMessage = '';

  showAddForm = false;

  editingPortfolioId: number | null = null;
  isEditMode = false;

  deletingPortfolioId: number | null = null;
  updatingStatusId: number | null = null;

  searchTerm = '';

  statusFilter: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';

  portfolioForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],
    slug: ['', [Validators.required, Validators.maxLength(180)]],
    shortDescription: ['', [Validators.required, Validators.maxLength(300)]],
    description: ['', [Validators.required]],
    clientName: ['', [Validators.required, Validators.maxLength(150)]],
    category: ['', [Validators.required, Validators.maxLength(100)]],
    imageUrl: ['', [Validators.maxLength(500)]],
    projectUrl: ['', [Validators.maxLength(500)]],
    active: [true],
  });

  ngOnInit(): void {
    this.loadPortfolios();
  }

  loadPortfolios(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.portfolioApi
      .getAllPortfolios()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (data) => {
          this.portfolios = data;
        },

        error: (error) => {
          console.error('Portfolio API error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to manage portfolios.';
          } else {
            this.errorMessage = 'Failed to load portfolios.';
          }
        },
      });
  }

  openAddForm(): void {
    this.resetForm();

    this.showAddForm = true;
    this.isEditMode = false;
    this.editingPortfolioId = null;
  }

  editPortfolio(portfolio: PortfolioModel): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.showAddForm = true;
    this.isEditMode = true;
    this.editingPortfolioId = portfolio.id;

    this.portfolioForm.patchValue({
      title: portfolio.title,
      slug: portfolio.slug,
      shortDescription: portfolio.shortDescription,
      description: portfolio.description,
      clientName: portfolio.clientName,
      category: portfolio.category,
      imageUrl: portfolio.imageUrl ?? '',
      projectUrl: portfolio.projectUrl ?? '',
      active: portfolio.active,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  cancelForm(): void {
    this.showAddForm = false;
    this.isEditMode = false;
    this.editingPortfolioId = null;

    this.resetForm();
  }

  submitForm(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.portfolioForm.invalid) {
      this.portfolioForm.markAllAsTouched();
      return;
    }

    const request: PortfolioRequest = this.portfolioForm.getRawValue();

    this.isSubmitting = true;

    if (this.isEditMode && this.editingPortfolioId !== null) {
      this.portfolioApi
        .updatePortfolio(this.editingPortfolioId, request)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
          }),
        )
        .subscribe({
          next: () => {
            this.successMessage = 'Portfolio updated successfully.';

            this.cancelForm();

            this.loadPortfolios();
          },

          error: (error) => {
            this.handleFormError(error, 'Failed to update portfolio.');
          },
        });

      return;
    }

    this.portfolioApi
      .createPortfolio(request)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Portfolio created successfully.';

          this.cancelForm();

          this.loadPortfolios();
        },

        error: (error) => {
          this.handleFormError(error, 'Failed to create portfolio.');
        },
      });
  }

  deletePortfolio(portfolio: PortfolioModel): void {
    const confirmed = window.confirm(`Are you sure you want to delete "${portfolio.title}"?`);

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.deletingPortfolioId = portfolio.id;

    this.portfolioApi
      .deletePortfolio(portfolio.id)
      .pipe(
        finalize(() => {
          this.deletingPortfolioId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Portfolio deleted successfully.';

          this.loadPortfolios();
        },

        error: (error) => {
          console.error('Delete portfolio error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to delete portfolios.';
          } else if (error.status === 404) {
            this.errorMessage = 'Portfolio not found.';
          } else {
            this.errorMessage = 'Failed to delete portfolio.';
          }
        },
      });
  }

  toggleStatus(portfolio: PortfolioModel): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.updatingStatusId = portfolio.id;

    const newStatus = !portfolio.active;

    this.portfolioApi
      .updatePortfolioStatus(portfolio.id, newStatus)
      .pipe(
        finalize(() => {
          this.updatingStatusId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = `Portfolio ${newStatus ? 'activated' : 'deactivated'
            } successfully.`;

          this.loadPortfolios();
        },

        error: (error) => {
          console.error('Portfolio status update error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to update portfolio status.';
          } else if (error.status === 404) {
            this.errorMessage = 'Portfolio not found.';
          } else {
            this.errorMessage = 'Failed to update portfolio status.';
          }
        },
      });
  }

  get filteredPortfolios(): PortfolioModel[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.portfolios.filter((portfolio) => {

      const title = (portfolio.title ?? '').toLowerCase();
      const clientName = (portfolio.clientName ?? '').toLowerCase();
      const category = (portfolio.category ?? '').toLowerCase();

      const matchesSearch =
        !search ||
        title.includes(search) ||
        clientName.includes(search) ||
        category.includes(search);

      const matchesStatus =
        this.statusFilter === 'ALL' ||
        (this.statusFilter === 'ACTIVE' && portfolio.active) ||
        (this.statusFilter === 'INACTIVE' && !portfolio.active);

      return matchesSearch && matchesStatus;
    });
  }

  private resetForm(): void {
    this.portfolioForm.reset({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      clientName: '',
      category: '',
      imageUrl: '',
      projectUrl: '',
      active: true,
    });

    this.portfolioForm.markAsPristine();
    this.portfolioForm.markAsUntouched();

    this.errorMessage = '';
  }

  private handleFormError(error: any, defaultMessage: string): void {
    console.error('Portfolio form error:', error);

    if (error.status === 400) {
      this.errorMessage = 'Please check the entered portfolio details.';
    } else if (error.status === 401) {
      this.errorMessage = 'Session expired. Please login again.';
    } else if (error.status === 403) {
      this.errorMessage = 'You are not authorized to perform this action.';
    } else if (error.status === 404) {
      this.errorMessage = 'Portfolio not found.';
    } else if (error.status === 409) {
      this.errorMessage = 'A portfolio with the same slug already exists.';
    } else {
      this.errorMessage = defaultMessage;
    }
  }
}
