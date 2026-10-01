import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ServiceApi } from '../../core/services/service-api';
import { Service } from '../../core/models/service.model';

@Component({
  selector: 'app-service-details',
  imports: [RouterLink],
  templateUrl: './service-details.html',
  styleUrl: './service-details.css',
})


export class ServiceDetails implements OnInit {

  private readonly serviceApi = inject(ServiceApi);
  private readonly route = inject(ActivatedRoute);

  constructor(private cdr: ChangeDetectorRef) { }

  service: Service | null = null;

  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadServiceDetails();
  }

  private loadServiceDetails(): void {

    this.isLoading = true;
    this.hasError = false;

    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      console.error('Service slug is missing.');

      this.isLoading = false;
      this.hasError = true;

      this.cdr.detectChanges();

      return;
    }

    console.log('Loading service with slug:', slug);

    this.serviceApi.getServiceBySlug(slug).subscribe({

      next: (data) => {

        this.service = data;
        this.isLoading = false;
        this.hasError = false;

        console.log('Service Details API Response:', data);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Service Details API Error:', error);

        this.service = null;
        this.isLoading = false;
        this.hasError = true;

        this.cdr.detectChanges();
      }

    });
  }
}