import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TestimonialApi } from '../../core/services/testimonial-api';
import { Testimonial } from '../../core/models/testimonial.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  imports: [RouterLink],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit {

  private readonly testimonialApi = inject(TestimonialApi);

  constructor(private cdr: ChangeDetectorRef) { }

  testimonials: Testimonial[] = [];

  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadTestimonials();
  }

  private loadTestimonials(): void {

    this.isLoading = true;
    this.hasError = false;

    this.testimonialApi.getActiveTestimonials().subscribe({

      next: (data) => {

        this.testimonials = data;
        this.isLoading = false;
        this.hasError = false;

        console.log('Testimonials Page API Response:', data);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Testimonials Page API Error:', error);

        this.testimonials = [];
        this.isLoading = false;
        this.hasError = true;

        this.cdr.detectChanges();
      }

    });
  }
}