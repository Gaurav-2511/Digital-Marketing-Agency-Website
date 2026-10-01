import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { Service } from '../../core/models/service.model';
import { ServiceApi } from '../../core/services/service-api';
import { RouterLink } from '@angular/router';
import { PortfolioApi } from '../../core/services/portfolio-api';
import { Portfolio } from '../../core/models/portfolio.model';
import { CaseStudyApi } from '../../core/services/case-study-api';
import { CaseStudy } from '../../core/models/case-study.model';
import { TestimonialApi } from '../../core/services/testimonial-api';
import { Testimonial } from '../../core/models/testimonial.model';
import { BlogApi } from '../../core/services/blog-api';
import { Blog as BlogModel } from '../../core/models/blog.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private readonly serviceApi = inject(ServiceApi);
  private readonly portfolioApi = inject(PortfolioApi);
  private readonly caseStudyApi = inject(CaseStudyApi);
  private readonly testimonialApi = inject(TestimonialApi);
  private readonly blogApi = inject(BlogApi);

  constructor(private cdr: ChangeDetectorRef) { }

  services: Service[] = [];
  portfolios: Portfolio[] = [];
  caseStudies: CaseStudy[] = [];
  testimonials: Testimonial[] = [];
  blogs: BlogModel[] = [];


  ngOnInit(): void {
    this.loadServices();
    this.loadPortfolios();
    this.loadCaseStudies();
    this.loadTestimonials();
    this.loadBlogs();
  }

  private loadServices(): void {
    this.serviceApi.getActiveServices().subscribe({
      next: (data) => {
        this.services = data;

        // console.log('Services API Response:', data);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Services API Error:', error);
      }
    });
  }


  private loadPortfolios(): void {

    this.portfolioApi.getActivePortfolios().subscribe({
      next: (data) => {
        this.portfolios = data;

        // console.log('Portfolio API Response:', data);
        this.cdr.detectChanges()
      },

      error: (error) => {
        console.error('Portfolio API Error:', error);
      }
    });
  }


  private loadCaseStudies(): void {

    this.caseStudyApi.getActiveCaseStudies().subscribe({
      next: (data) => {
        this.caseStudies = data;

        // console.log('Case Studies API Response:', data);
        this.cdr.detectChanges();

      },

      error: (error) => {
        console.error('Case Studies API Error:', error);
      }
    });
  }

  private loadTestimonials(): void {

    this.testimonialApi.getActiveTestimonials().subscribe({
      next: (data) => {
        this.testimonials = data;

        // console.log('Testimonials API Response:', data);
        this.cdr.detectChanges()

      },

      error: (error) => {
        console.error('Testimonials API Error:', error);
      }
    });
  }

  private loadBlogs(): void {

    this.blogApi.getPublishedBlogs().subscribe({
      next: (data: any) => {
        this.blogs = data;

        // console.log('Blogs API Response:', data);
        this.cdr.detectChanges()
      },

      error: (error) => {
        console.error('Blogs API Error:', error);
      }
    });
  }
}