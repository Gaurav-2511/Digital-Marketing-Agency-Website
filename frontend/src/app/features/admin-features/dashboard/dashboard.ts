import { Dashboard as DashboardModel } from './../../../core/models/dashboard.model';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardApi } from '../../../core/services/dashboard-api';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private readonly dashboardApi = inject(DashboardApi);

  constructor(private cdr:ChangeDetectorRef){}

  dashboardData: DashboardModel | null = null;

  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadDashboardStatistics();
  }

  loadDashboardStatistics(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardApi.getDashboardStatistics().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;

        console.log('Dashboard statistics:', data);
        this.cdr.detectChanges();
      },

      error: (error) => {
        this.isLoading = false;

        console.error('Dashboard API error:', error);

        if (error.status === 401) {
          this.errorMessage = 'Session expired. Please login again.';
        } else if (error.status === 403) {
          this.errorMessage = 'You are not authorized to access the dashboard.';
        } else {
          this.errorMessage = 'Failed to load dashboard statistics.';
        }
      },
    });
  }
}
