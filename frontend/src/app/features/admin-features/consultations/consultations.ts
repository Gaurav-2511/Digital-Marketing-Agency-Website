import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import {
  Consultation,
  ConsultationStatus,
  MeetingType,
} from '../../../core/models/consultation.model';
import { AdminConsultationApi } from '../../../core/services/admin-consultation-api';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './consultations.html',
  styleUrl: './consultations.css',
})
export class Consultations implements OnInit {
  private readonly consultationApi = inject(AdminConsultationApi);
  private readonly cdr = inject(ChangeDetectorRef);

  consultations: Consultation[] = [];
  selectedConsultation: Consultation | null = null;

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  searchTerm = '';
  statusFilter: 'ALL' | ConsultationStatus = 'ALL';

  updatingStatusId: number | null = null;
  schedulingId: number | null = null;
  deletingId: number | null = null;
  detailsLoadingId: number | null = null;

  showScheduleForm = false;
  scheduledAt = '';
  adminNotes = '';

  readonly statusOptions: ConsultationStatus[] = [
    'REQUESTED',
    'CONTACTED',
    'SCHEDULED',
    'COMPLETED',
    'CANCELLED',
  ];

  readonly meetingTypes: MeetingType[] = ['ONLINE', 'PHONE', 'IN_PERSON'];

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.consultationApi
      .getAllConsultations()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (data) => {
          this.consultations = data;
        },
        error: (error) => {
          console.error('Failed to load consultations:', error);
          this.errorMessage = this.getErrorMessage(error, 'load');
        },
      });
  }

  viewDetails(consultation: Consultation): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.detailsLoadingId = consultation.id;

    this.consultationApi
      .getConsultationById(consultation.id)
      .pipe(
        finalize(() => {
          this.detailsLoadingId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (data) => {
          this.selectedConsultation = data;
          this.showScheduleForm = false;
          this.scheduledAt = data.scheduledAt ? data.scheduledAt.slice(0, 16) : '';
          this.adminNotes = data.adminNotes ?? '';
        },
        error: (error) => {
          console.error('Failed to load consultation details:', error);
          this.errorMessage = this.getErrorMessage(error, 'details');
        },
      });
  }

  closeDetails(): void {
    this.selectedConsultation = null;
    this.showScheduleForm = false;
  }

  updateStatus(consultation: Consultation, value: string): void {
    if (!this.statusOptions.includes(value as ConsultationStatus)) {
      this.errorMessage = 'Invalid consultation status.';
      return;
    }

    const newStatus = value as ConsultationStatus;

    if (newStatus === consultation.status) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.updatingStatusId = consultation.id;

    this.consultationApi
      .updateStatus(consultation.id, newStatus)
      .pipe(
        finalize(() => {
          this.updatingStatusId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (updated) => {
          this.replaceConsultation(updated);
          this.successMessage = 'Consultation status updated successfully.';
        },
        error: (error) => {
          console.error('Failed to update consultation status:', error);
          this.errorMessage = this.getErrorMessage(error, 'status');
        },
      });
  }

  openScheduleForm(consultation: Consultation): void {
    this.selectedConsultation = consultation;
    this.scheduledAt = consultation.scheduledAt ? consultation.scheduledAt.slice(0, 16) : '';
    this.adminNotes = consultation.adminNotes ?? '';
    this.showScheduleForm = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  saveSchedule(): void {
    if (!this.selectedConsultation || !this.scheduledAt) {
      this.errorMessage = 'Please select a scheduled date and time.';
      return;
    }

    const scheduledDate = new Date(this.scheduledAt);

    if (Number.isNaN(scheduledDate.getTime()) || scheduledDate <= new Date()) {
      this.errorMessage = 'Scheduled date and time must be in the future.';
      return;
    }

    const id = this.selectedConsultation.id;
    this.errorMessage = '';
    this.successMessage = '';
    this.schedulingId = id;

    this.consultationApi
      .scheduleConsultation(id, {
        scheduledAt: this.scheduledAt,
        adminNotes: this.adminNotes.trim(),
      })
      .pipe(
        finalize(() => {
          this.schedulingId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (updated) => {
          this.replaceConsultation(updated);
          this.selectedConsultation = updated;
          this.showScheduleForm = false;
          this.successMessage = 'Consultation scheduled successfully.';
        },
        error: (error) => {
          console.error('Failed to schedule consultation:', error);
          this.errorMessage = this.getErrorMessage(error, 'schedule');
        },
      });
  }

  deleteConsultation(consultation: Consultation): void {
    const confirmed = window.confirm(
      `Delete the consultation request from "${consultation.name}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.deletingId = consultation.id;

    this.consultationApi
      .deleteConsultation(consultation.id)
      .pipe(
        finalize(() => {
          this.deletingId = null;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.consultations = this.consultations.filter((item) => item.id !== consultation.id);

          if (this.selectedConsultation?.id === consultation.id) {
            this.selectedConsultation = null;
          }

          this.successMessage = 'Consultation deleted successfully.';
        },
        error: (error) => {
          console.error('Failed to delete consultation:', error);
          this.errorMessage = this.getErrorMessage(error, 'delete');
        },
      });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'ALL';
  }

  get filteredConsultations(): Consultation[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.consultations.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.phone.toLowerCase().includes(search) ||
        (item.company ?? '').toLowerCase().includes(search) ||
        item.service.toLowerCase().includes(search);

      const matchesStatus = this.statusFilter === 'ALL' || item.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  get totalConsultations(): number {
    return this.consultations.length;
  }

  get requestedCount(): number {
    return this.consultations.filter((item) => item.status === 'REQUESTED').length;
  }

  get scheduledCount(): number {
    return this.consultations.filter((item) => item.status === 'SCHEDULED').length;
  }

  get completedCount(): number {
    return this.consultations.filter((item) => item.status === 'COMPLETED').length;
  }

  formatStatus(status: ConsultationStatus): string {
    return status.replaceAll('_', ' ');
  }

  formatMeetingType(type: MeetingType): string {
    return type.replaceAll('_', ' ');
  }

  private replaceConsultation(updated: Consultation): void {
    this.consultations = this.consultations.map((item) =>
      item.id === updated.id ? updated : item,
    );

    if (this.selectedConsultation?.id === updated.id) {
      this.selectedConsultation = updated;
    }
  }

  private getErrorMessage(error: { status?: number }, action: string): string {
    if (error.status === 401) {
      return 'Session expired. Please log in again.';
    }

    if (error.status === 403) {
      return 'You are not authorized to manage consultations.';
    }

    if (error.status === 404) {
      return 'Consultation not found. Refresh the list and try again.';
    }

    if (error.status === 400) {
      return 'The request was rejected. Check the date, time, or submitted values.';
    }

    if (error.status === 0) {
      return 'Cannot connect to the backend. Check that Spring Boot is running.';
    }

    const messages: Record<string, string> = {
      load: 'Failed to load consultations.',
      details: 'Failed to load consultation details.',
      status: 'Failed to update consultation status.',
      schedule: 'Failed to schedule consultation.',
      delete: 'Failed to delete consultation.',
    };

    return messages[action] ?? 'An unexpected error occurred.';
  }
}
