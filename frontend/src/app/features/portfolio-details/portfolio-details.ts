import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PortfolioApi } from '../../core/services/portfolio-api';
import { Portfolio } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-portfolio-details',
  imports: [RouterLink],
  templateUrl: './portfolio-details.html',
  styleUrl: './portfolio-details.css',
})
export class PortfolioDetails implements OnInit {

  private readonly portfolioApi = inject(PortfolioApi);
  private readonly route = inject(ActivatedRoute);

  constructor(private cdr: ChangeDetectorRef) {}

  portfolio: Portfolio | null = null;

  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadPortfolioDetails();
  }

  private loadPortfolioDetails(): void {

    this.isLoading = true;
    this.hasError = false;

    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {

      console.error('Portfolio slug is missing.');

      this.isLoading = false;
      this.hasError = true;

      this.cdr.detectChanges();

      return;
    }

    console.log('Loading portfolio with slug:', slug);

    this.portfolioApi.getPortfolioBySlug(slug).subscribe({

      next: (data) => {

        this.portfolio = data;
        this.isLoading = false;
        this.hasError = false;

        console.log('Portfolio Details API Response:', data);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Portfolio Details API Error:', error);

        this.portfolio = null;
        this.isLoading = false;
        this.hasError = true;

        this.cdr.detectChanges();
      }

    });
  }
}
