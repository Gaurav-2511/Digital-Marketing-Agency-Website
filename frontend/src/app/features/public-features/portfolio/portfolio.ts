import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PortfolioApi } from '../../../core/services/portfolio-api';
import { Portfolio as PortfolioModel } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-portfolio',
  imports: [RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit {

  private readonly portfolioApi = inject(PortfolioApi);

  constructor(private cdr: ChangeDetectorRef) {}

  portfolios: PortfolioModel[] = [];

  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadPortfolios();
  }

  private loadPortfolios(): void {

    this.isLoading = true;
    this.hasError = false;

    this.portfolioApi.getActivePortfolios().subscribe({

      next: (data) => {

        this.portfolios = data;
        this.isLoading = false;

        console.log('Portfolio Page API Response:', data);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Portfolio Page API Error:', error);

        this.portfolios = [];
        this.isLoading = false;
        this.hasError = true;

        this.cdr.detectChanges();
      }

    });
  }
}
