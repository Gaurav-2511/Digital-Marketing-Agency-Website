import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminBlogCategoryApi } from '../../../core/services/admin-blog-category-api';
import { BlogCategory, BlogCategoryRequest } from '../../../core/models/blog-category.model';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-categories',
  imports: [ReactiveFormsModule,DatePipe],
  templateUrl: './blog-categories.html',
  styleUrl: './blog-categories.css',
})

export class BlogCategories implements OnInit {

  private readonly api = inject(AdminBlogCategoryApi);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  categories: BlogCategory[] = [];

  isLoading = false;
  isSubmitting = false;

  errorMessage = '';
  successMessage = '';

  showForm = false;
  isEditMode = false;
  editingCategoryId: number | null = null;

  deletingCategoryId: number | null = null;
  updatingStatusId: number | null = null;

  searchTerm = '';
  statusFilter: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';

  categoryForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    slug: [
      '',
      [
        Validators.required,
        Validators.maxLength(120),
        Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      ],
    ],
    active: [true],
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.api
      .getAllCategories()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (error) => {
          console.error('Load blog categories error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to manage blog categories.';
          } else {
            this.errorMessage = 'Failed to load blog categories.';
          }
        },
      });
  }

  openAddForm(): void {
    this.resetMessages();
    this.isEditMode = false;
    this.editingCategoryId = null;
    this.categoryForm.reset({ name: '', slug: '', active: true });
    this.showForm = true;
  }

  openEditForm(category: BlogCategory): void {
    this.resetMessages();
    this.isEditMode = true;
    this.editingCategoryId = category.id;
    this.categoryForm.reset({
      name: category.name,
      slug: category.slug,
      active: category.active,
    });
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.isEditMode = false;
    this.editingCategoryId = null;
    this.categoryForm.reset({ name: '', slug: '', active: true });
  }

  saveCategory(): void {
    this.resetMessages();

    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const request: BlogCategoryRequest = this.categoryForm.getRawValue();

    this.isSubmitting = true;

    const request$ =
      this.isEditMode && this.editingCategoryId !== null
        ? this.api.updateCategory(this.editingCategoryId, request)
        : this.api.createCategory(request);

    request$
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = this.isEditMode
            ? 'Blog category updated successfully.'
            : 'Blog category created successfully.';

          this.cancelForm();
          this.loadCategories();
        },
        error: (error) => {
          console.error('Save blog category error:', error);

          if (error.status === 400) {
            this.errorMessage =
              error.error?.message || 'Invalid category details or duplicate slug.';
          } else if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to save blog categories.';
          } else if (error.status === 409) {
            this.errorMessage = 'A category with this slug already exists.';
          } else if (error.status === 404) {
            this.errorMessage = 'Blog category not found.';
          } else {
            this.errorMessage = 'Failed to save blog category.';
          }
        },
      });
  }

  deleteCategory(category: BlogCategory): void {
    this.resetMessages();

    const confirmed = window.confirm(`Are you sure you want to delete "${category.name}"?`);

    if (!confirmed) {
      return;
    }

    this.deletingCategoryId = category.id;

    this.api
      .deleteCategory(category.id)
      .pipe(
        finalize(() => {
          this.deletingCategoryId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Blog category deleted successfully.';
          this.loadCategories();
        },
        error: (error) => {
          console.error('Delete blog category error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to delete categories.';
          } else if (error.status === 404) {
            this.errorMessage = 'Blog category not found.';
          } else if (error.status === 400 || error.status === 409) {
            this.errorMessage =
              'This category may be in use by existing blogs and cannot be deleted.';
          } else {
            this.errorMessage =
              error.error?.message ||
              'Failed to delete category. Check whether blogs use this category.';
          }
        },
      });
  }

  toggleCategoryStatus(category: BlogCategory, active: boolean): void {
    this.resetMessages();

    if (this.updatingStatusId !== null) {
      return;
    }

    this.updatingStatusId = category.id;

    this.api
      .updateCategoryStatus(category.id, active)
      .pipe(
        finalize(() => {
          this.updatingStatusId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (updatedCategory) => {
          this.categories = this.categories.map((item) =>
            item.id === updatedCategory.id ? updatedCategory : item,
          );

          this.successMessage =
            `Category "${updatedCategory.name}" is now ` +
            `${updatedCategory.active ? 'Active' : 'Inactive'}.`;
        },
        error: (error) => {
          console.error('Update category status error:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to update category status.';
          } else if (error.status === 404) {
            this.errorMessage = 'Blog category not found.';
          } else {
            this.errorMessage = 'Failed to update category status.';
          }

          this.loadCategories();
        },
      });
  }

  get filteredCategories(): BlogCategory[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(term) || category.slug.toLowerCase().includes(term);

      const matchesStatus =
        this.statusFilter === 'ALL' ||
        (this.statusFilter === 'ACTIVE' && category.active) ||
        (this.statusFilter === 'INACTIVE' && !category.active);

      return matchesSearch && matchesStatus;
    });
  }

  private resetMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
