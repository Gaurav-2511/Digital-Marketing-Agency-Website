
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminLeadApi } from '../../../core/services/admin-lead-api';
import { Lead, LeadStatus } from '../../../core/models/lead.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './leads.html',
  styleUrl: './leads.css',
})
export class Leads implements OnInit {
  private readonly leadApi = inject(AdminLeadApi);
  private readonly cdr = inject(ChangeDetectorRef);
  leads: Lead[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  searchTerm = '';
  statusFilter: 'ALL' | LeadStatus = 'ALL';
  updatingStatusId: number | null = null;
  deletingLeadId: number | null = null;

  readonly statusOptions: LeadStatus[] = [
    'NEW',
    'CONTACTED',
    'IN_PROGRESS',
    'CONVERTED',
    'REJECTED',
  ];

  ngOnInit(): void {
    this.loadLeads();
  }

  loadLeads(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.leadApi.getAllLeads()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (data) => {
          this.leads = data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Failed to load leads:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please log in again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to view leads.';
          } else {
            this.errorMessage = 'Failed to load leads. Please try again.';
          }
        },
      });
  }

  updateStatus(lead: Lead, value: string): void {
    if (!this.statusOptions.includes(value as LeadStatus)) {
      this.errorMessage = 'Invalid status selected.';
      return;
    }

    const newStatus = value as LeadStatus;

    if (newStatus === lead.status) {
      return;
    }

    const previousStatus = lead.status;

    this.errorMessage = '';
    this.successMessage = '';
    this.updatingStatusId = lead.id;

    // Update the selected row optimistically.
    lead.status = newStatus;

    this.leadApi.updateLeadStatus(lead.id, newStatus)
      .pipe(finalize(() => {
        this.updatingStatusId = null;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (updatedLead) => {
          // Use the status returned by the backend.
          this.leads = this.leads.map((item) =>
            item.id === updatedLead.id ? updatedLead : item
          );

          this.successMessage = 'Lead status updated successfully.';
          this.cdr.detectChanges();
        },
        error: (error) => {
          // Restore the old status if the server rejects the update.
          this.leads = this.leads.map((item) =>
            item.id === lead.id
              ? { ...item, status: previousStatus }
              : item
          );

          console.error('Failed to update lead status:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please log in again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to update leads.';
          } else if (error.status === 404) {
            this.errorMessage = 'Lead not found.';
          } else if (error.status === 0) {
            this.errorMessage = 'Cannot connect to the backend.';
          } else {
            this.errorMessage = 'Failed to update lead status.';
          }
        },
      });
  }

  deleteLead(lead: Lead): void {
    if (!window.confirm(`Delete the lead from "${lead.name}"?`)) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.deletingLeadId = lead.id;

    this.leadApi.deleteLead(lead.id)
      .pipe(finalize(() => {
        this.deletingLeadId = null;
      }))
      .subscribe({
        next: () => {
          this.leads = this.leads.filter(
            (item) => item.id !== lead.id
          );
          this.successMessage = 'Lead deleted successfully.';
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Failed to delete lead:', error);

          if (error.status === 401) {
            this.errorMessage = 'Session expired. Please log in again.';
          } else if (error.status === 403) {
            this.errorMessage = 'You are not authorized to delete leads.';
          } else {
            this.errorMessage = 'Failed to delete lead.';
          }
        },
      });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'ALL';
  }

  get filteredLeads(): Lead[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.leads.filter((lead) => {
      const matchesSearch =
        !search ||
        (lead.name ?? '').toLowerCase().includes(search) ||
        (lead.email ?? '').toLowerCase().includes(search) ||
        (lead.phone ?? '').toLowerCase().includes(search) ||
        (lead.company ?? '').toLowerCase().includes(search) ||
        (lead.service ?? '').toLowerCase().includes(search);

      const matchesStatus =
        this.statusFilter === 'ALL' ||
        lead.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  get totalLeads(): number {
    return this.leads.length;
  }

  get newLeads(): number {
    return this.leads.filter((lead) => lead.status === 'NEW').length;
  }

  get inProgressLeads(): number {
    return this.leads.filter(
      (lead) => lead.status === 'IN_PROGRESS'
    ).length;
  }

  get convertedLeads(): number {
    return this.leads.filter(
      (lead) => lead.status === 'CONVERTED'
    ).length;
  }

  formatStatus(status: LeadStatus): string {
    return status.replaceAll('_', ' ');
  }

  trackByLeadId(_index: number, lead: Lead): number {
    return lead.id;
  }
}
