import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AdminServiceApi } from '../../../core/services/admin-service-api';
import { Service } from '../../../core/models/service.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceRequest } from '../../../core/models/service-request';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-services',
  imports: [ReactiveFormsModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {

  private readonly adminServiceApi = inject(AdminServiceApi);
  private readonly formBuilder = inject(FormBuilder);

  constructor(private cdr: ChangeDetectorRef) { }

  services: Service[] = [];

  isLoading = false;
  isSubmitting = false;

  errorMessage = '';
  successMessage = '';

  showAddForm = false;

  editingServiceId: number | null = null;
  isEditMode = false;

  deletingServiceId: number | null = null;

  updatingStatusId: number | null = null;

  searchTerm = '';

  statusFilter: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';

  serviceForm = this.formBuilder.nonNullable.group({

    title: ['', [Validators.required, Validators.maxLength(150)]],

    slug: ['', [Validators.required, Validators.maxLength(180)]],

    shortDescription: ['', [Validators.required, Validators.maxLength(300)]],

    description: ['', [Validators.required]],

    icon: ['', [Validators.maxLength(100)]],

    imageUrl: ['', [Validators.maxLength(500)]],

    active: [true],
  });

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.adminServiceApi.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        this.isLoading = false;

        console.log('Admin services:', data);
        this.cdr.detectChanges();
      },

      error: (error) => {
        this.isLoading = false;

        console.error('Admin services API error:', error);

        if (error.status === 401) {
          this.errorMessage = 'Session expired. Please login again.';
        } else if (error.status === 403) {
          this.errorMessage = 'You are not authorized to manage services.';
        } else {
          this.errorMessage = 'Failed to load services.';
        }
      },
    });
  }

  openAddForm(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.serviceForm.reset({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      icon: '',
      imageUrl: '',
      active: true,
    });

    this.showAddForm = true;
  }

  cancelAddForm(): void {

    this.showAddForm = false;
    this.isEditMode = false;
    this.editingServiceId = null;

    this.serviceForm.reset({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      icon: '',
      imageUrl: '',
      active: true,
    });
  }

  createService(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    const request: ServiceRequest = this.serviceForm.getRawValue();

    this.isSubmitting = true;

    this.adminServiceApi.createService(request).subscribe({
      next: (createdService) => {
        console.log('Service created:', createdService);

        this.isSubmitting = false;

        this.successMessage = 'Service created successfully.';

        this.showAddForm = false;

        this.serviceForm.reset({
          title: '',
          slug: '',
          shortDescription: '',
          description: '',
          icon: '',
          imageUrl: '',
          active: true,
        });

        this.loadServices();
      },

      error: (error) => {
        this.isSubmitting = false;

        console.error('Create service error:', error);

        if (error.status === 400) {
          this.errorMessage = 'Please check the entered service details.';
        } else if (error.status === 401) {
          this.errorMessage = 'Session expired. Please login again.';
        } else if (error.status === 403) {
          this.errorMessage = 'You are not authorized to create services.';
        } else if (error.status === 409) {
          this.errorMessage = 'A service with this slug already exists.';
        } else {
          this.errorMessage = 'Failed to create service.';
        }
      },
    });
  }

  updateService(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    if (this.editingServiceId === null) {
      this.errorMessage = 'Invalid service selected.';
      return;
    }

    const request: ServiceRequest = this.serviceForm.getRawValue();

    this.isSubmitting = true;

    this.adminServiceApi
      .updateService(this.editingServiceId, request)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (updatedService) => {

          this.successMessage = 'Service updated successfully.';

          this.showAddForm = false;
          this.isEditMode = false;
          this.editingServiceId = null;

          this.serviceForm.reset({
            title: '',
            slug: '',
            shortDescription: '',
            description: '',
            icon: '',
            imageUrl: '',
            active: true,
          });

          this.loadServices();
        },
        error: (error) => {
          console.error('Update service error:', error);

          if (error.status === 400) {
            this.errorMessage =
              error.error?.message ||
              'Invalid service data. Please check the entered details.';
          } else if (error.status === 401) {
            this.errorMessage =
              'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage =
              'You are not authorized to update services.';
          } else if (error.status === 404) {
            this.errorMessage =
              'Service not found.';
          } else if (error.status === 409) {
            this.errorMessage =
              'A service with this slug already exists.';
          } else {
            this.errorMessage =
              'Failed to update service.';
          }

          this.cdr.detectChanges();
        },
      });
  }


  openEditForm(id: number): void {

    this.successMessage = '';
    this.errorMessage = '';

    this.isEditMode = true;
    this.editingServiceId = id;
    this.showAddForm = true;
    this.isSubmitting = false;

    this.adminServiceApi.getServiceById(id).subscribe({

      next: (service) => {

        this.serviceForm.patchValue({
          title: service.title,
          slug: service.slug,
          shortDescription: service.shortDescription,
          description: service.description,
          icon: service.icon ?? '',
          imageUrl: service.imageUrl ?? '',
          active: service.active,
        });

      },

      error: (error) => {

        console.error('Get service by ID error:', error);

        this.showAddForm = false;
        this.isEditMode = false;
        this.editingServiceId = null;

        if (error.status === 404) {
          this.errorMessage = 'Service not found.';
        } else if (error.status === 401) {
          this.errorMessage = 'Session expired. Please login again.';
        } else if (error.status === 403) {
          this.errorMessage =
            'You are not authorized to edit services.';
        } else {
          this.errorMessage = 'Failed to load service details.';
        }
      },
    });
  }

  deleteService(id: number): void {
    this.successMessage = '';
    this.errorMessage = '';

    const service = this.services.find(
      (item) => item.id === id
    );

    if (!service) {
      this.errorMessage = 'Service not found.';
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.title}"?`
    );

    if (!confirmed) {
      return;
    }

    this.deletingServiceId = id;

    this.adminServiceApi
      .deleteService(id)
      .pipe(
        finalize(() => {
          this.deletingServiceId = null;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          console.log('Service deleted:', id);

          this.successMessage =
            'Service deleted successfully.';

          this.loadServices();
        },

        error: (error) => {
          console.error('Delete service error:', error);

          if (error.status === 401) {
            this.errorMessage =
              'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage =
              'You are not authorized to delete services.';
          } else if (error.status === 404) {
            this.errorMessage =
              'Service not found.';
          } else {
            this.errorMessage =
              error.error?.message ||
              'Failed to delete service.';
          }

          this.cdr.detectChanges();
        },
      });
  }


  toggleServiceStatus(id: number, active: boolean): void {
    this.errorMessage = '';
    this.successMessage = '';

    const service = this.services.find(item => item.id === id);

    if (!service) {
      this.errorMessage = 'Service not found.';
      return;
    }

    if (this.updatingStatusId !== null) {
      return;
    }

    this.updatingStatusId = id;

    this.adminServiceApi
      .updateServiceStatus(id, active)
      .pipe(
        finalize(() => {
          this.updatingStatusId = null;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (updatedService) => {
          this.services = this.services.map(item =>
            item.id === id ? updatedService : item
          );

          this.successMessage =
            `Service "${updatedService.title}" is now ${updatedService.active ? 'Active' : 'Inactive'
            }.`;
        },
        error: (error) => {
          console.error('Update service status error:', error);

          if (error.status === 400) {
            this.errorMessage =
              error.error?.message || 'Invalid service status.';
          } else if (error.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else if (error.status === 403) {
            this.errorMessage =
              'You are not authorized to update service status.';
          } else if (error.status === 404) {
            this.errorMessage = 'Service not found.';
          } else {
            this.errorMessage =
              error.error?.message || 'Failed to update service status.';
          }
        }
      });
  }

  get filteredServices(): Service[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(term) ||
        service.slug.toLowerCase().includes(term);

      const matchesStatus =
        this.statusFilter === 'ALL' ||
        (this.statusFilter === 'ACTIVE' && service.active) ||
        (this.statusFilter === 'INACTIVE' && !service.active);

      return matchesSearch && matchesStatus;
    });
  }
}
