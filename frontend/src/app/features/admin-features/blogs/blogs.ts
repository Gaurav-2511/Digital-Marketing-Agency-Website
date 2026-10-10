import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminBlogApi } from '../../../core/services/admin-blog-api';
import { AdminBlogCategoryApi } from '../../../core/services/admin-blog-category-api';
import { Blog, BlogRequest } from '../../../core/models/blog.model';
import { BlogCategory } from '../../../core/models/blog-category.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs implements OnInit {

  private readonly api = inject(AdminBlogApi);
  private readonly categoryApi = inject(AdminBlogCategoryApi);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  blogs: Blog[] = [];
  categories: BlogCategory[] = [];

  isLoading = false;
  isSubmitting = false;
  isLoadingCategories = false;

  showForm = false;
  isEditMode = false;
  editingBlogId: number | null = null;
  deletingBlogId: number | null = null;
  updatingStatusId: number | null = null;

  errorMessage = '';
  successMessage = '';
  categoryError = '';
  searchTerm = '';
  statusFilter: 'ALL' | 'PUBLISHED' | 'DRAFT' = 'ALL';

  blogForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    slug: [
      '',
      [
        Validators.required,
        Validators.maxLength(220),
        Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      ],
    ],
    shortDescription: ['', [Validators.required, Validators.maxLength(500)]],
    content: ['', Validators.required],
    featuredImage: ['', Validators.maxLength(500)],
    author: ['', [Validators.required, Validators.maxLength(150)]],
    published: [false],
    categoryId: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.loadCategories();
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();;

    this.api
      .getAllBlogs()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (data) => {
          this.blogs = data;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Load blogs error:', error);
          this.errorMessage = this.getErrorMessage(
            error,
            'Failed to load blogs.',
          );
          this.cdr.markForCheck();
        },
      });
  }

  loadCategories(): void {
    this.isLoadingCategories = true;
    this.categoryError = '';
    this.cdr.markForCheck();

    this.categoryApi
      .getAllCategories()
      .pipe(
        finalize(() => {
          this.isLoadingCategories = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (data) => {
          this.categories = data;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Load blog categories error:', error);
          this.categoryError = this.getErrorMessage(
            error,
            'Failed to load blog categories. Please retry.',
          );
          this.cdr.markForCheck();
        },
      });
  }

  openAddForm(): void {
    this.resetMessages();
    this.isEditMode = false;
    this.editingBlogId = null;
    this.blogForm.reset({
      title: '',
      slug: '',
      shortDescription: '',
      content: '',
      featuredImage: '',
      author: '',
      published: false,
      categoryId: 0,
    });
    this.showForm = true;
  }

  openEditForm(blog: Blog): void {
    this.resetMessages();
    this.isEditMode = true;
    this.editingBlogId = blog.id;

    this.blogForm.reset({
      title: blog.title,
      slug: blog.slug,
      shortDescription: blog.shortDescription,
      content: blog.content,
      featuredImage: blog.featuredImage ?? '',
      author: blog.author,
      published: blog.published,
      categoryId: blog.categoryId,
    });

    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.isEditMode = false;
    this.editingBlogId = null;
    this.blogForm.reset({
      title: '',
      slug: '',
      shortDescription: '',
      content: '',
      featuredImage: '',
      author: '',
      published: false,
      categoryId: 0,
    });
  }

  saveBlog(): void {
    this.resetMessages();

    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.editingBlogId === null) {
      this.errorMessage = 'Cannot update blog: blog ID is missing.';
      return;
    }

    const value = this.blogForm.getRawValue();

    const request: BlogRequest = {
      ...value,
      title: value.title.trim(),
      slug: value.slug.trim(),
      shortDescription: value.shortDescription.trim(),
      content: value.content.trim(),
      featuredImage: value.featuredImage.trim(),
      author: value.author.trim(),
      categoryId: Number(value.categoryId),
    };

    this.isSubmitting = true;

    const request$ =
      this.isEditMode && this.editingBlogId !== null
        ? this.api.updateBlog(this.editingBlogId, request)
        : this.api.createBlog(request);

    request$.pipe(finalize(() => (this.isSubmitting = false))).subscribe({
      next: () => {
        this.successMessage = this.isEditMode
          ? 'Blog updated successfully.'
          : 'Blog created successfully.';

        this.cancelForm();
        this.loadBlogs();
      },
      error: (error) => {
        console.error('Save blog error:', error);
        this.errorMessage = this.getErrorMessage(
          error,
          'Failed to save blog. Check the fields and try again.',
        );
      },
    });
  }

  togglePublished(blog: Blog): void {
    this.resetMessages();

    if (this.updatingStatusId !== null) {
      return;
    }

    this.updatingStatusId = blog.id;
    const nextPublishedStatus = !blog.published;

    this.api
      .updateBlogStatus(blog.id, nextPublishedStatus)
      .pipe(finalize(() => (this.updatingStatusId = null)))
      .subscribe({
        next: (updatedBlog) => {
          this.blogs = this.blogs.map((item) => (item.id === updatedBlog.id ? updatedBlog : item));

          this.successMessage = updatedBlog.published
            ? 'Blog published successfully.'
            : 'Blog changed to draft successfully.';
            this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Update blog status error:', error);
          this.errorMessage = this.getErrorMessage(error, 'Failed to update blog status.');
        },
      });
  }

  deleteBlog(blog: Blog): void {
    this.resetMessages();

    if (!window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      return;
    }

    this.deletingBlogId = blog.id;

    this.api
      .deleteBlog(blog.id)
      .pipe(finalize(() => (this.deletingBlogId = null)))
      .subscribe({
        next: () => {
          this.blogs = this.blogs.filter((item) => item.id !== blog.id);
          this.successMessage = 'Blog deleted successfully.';
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Delete blog error:', error);
          this.errorMessage = this.getErrorMessage(error, 'Failed to delete blog.');
        },
      });
  }

  get filteredBlogs(): Blog[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(term) ||
        blog.slug.toLowerCase().includes(term) ||
        blog.author.toLowerCase().includes(term) ||
        blog.categoryName.toLowerCase().includes(term);

      const matchesStatus =
        this.statusFilter === 'ALL' ||
        (this.statusFilter === 'PUBLISHED' && blog.published) ||
        (this.statusFilter === 'DRAFT' && !blog.published);

      return matchesSearch && matchesStatus;
    });
  }

  private resetMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  private getErrorMessage(error: any, fallback: string): string {
    if (error.status === 0) {
      return 'Cannot connect to the backend. Check whether Spring Boot is running.';
    }

    if (error.status === 401) {
      return 'Your session may have expired. Please log in again.';
    }

    if (error.status === 403) {
      return 'You are not authorized to perform this action.';
    }

    if (error.status === 400) {
      return error.error?.message || 'Invalid data. Please check your input.';
    }

    if (error.status === 404) {
      return error.error?.message || 'The requested blog was not found.';
    }

    if (error.status === 409) {
      return error.error?.message || 'A blog with this slug may already exist.';
    }

    return error.error?.message || fallback;
  }
}
