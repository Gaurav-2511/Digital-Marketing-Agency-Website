import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceApi } from '../../core/services/service-api';
import { Service } from '../../core/models/service.model';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {

  private readonly serviceApi = inject(ServiceApi);

  constructor(private cdr: ChangeDetectorRef){}

  services: Service[] = [];

  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {

    this.isLoading = true;
    this.hasError = false;

    this.serviceApi.getActiveServices().subscribe({

      next: (data) => {
        this.services = data;
        this.isLoading = false;

        console.log('Services Page API Response:', data);
        this.cdr.detectChanges()
      },

      error: (error) => {
        console.error('Services Page API Error:', error);

        this.isLoading = false;
        this.hasError = true;
      }

    });
  }
}