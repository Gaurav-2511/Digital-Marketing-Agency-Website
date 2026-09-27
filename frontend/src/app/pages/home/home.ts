import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ServiceApi } from '../../core/services/service-api';
import { Service } from '../../core/models/service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  private readonly serviceApi = inject(ServiceApi);

  services = signal<Service[]>([]);
  isLoadingServices = signal(false);
  servicesError = signal(false);

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {

    this.isLoadingServices.set(true);
    this.servicesError.set(false);

    this.serviceApi.getActiveServices().subscribe({

      next: (services) => {

        this.services.set(
          services.slice(0, 3)
        );

        console.log('Services:', this.services());

        this.isLoadingServices.set(false);
      },

      error: (error) => {

        console.error('Services API error:', error);

        this.servicesError.set(true);
        this.isLoadingServices.set(false);
      },

    });
  }
}