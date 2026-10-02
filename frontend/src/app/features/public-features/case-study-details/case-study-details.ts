import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CaseStudyApi } from '../../../core/services/case-study-api';
import { CaseStudy } from '../../../core/models/case-study.model';

@Component({
  selector: 'app-case-study-details',
  imports: [RouterLink],
  templateUrl: './case-study-details.html',
  styleUrl: './case-study-details.css',
})
export class CaseStudyDetails implements OnInit {

  private readonly caseStudyApi = inject(CaseStudyApi);
  private readonly route = inject(ActivatedRoute);

  constructor(private cdr: ChangeDetectorRef) { }

  caseStudy: CaseStudy | null = null;

  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadCaseStudyDetails();
  }

  private loadCaseStudyDetails(): void {

    this.isLoading = true;
    this.hasError = false;

    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {

      console.error('Case study slug is missing.');

      this.isLoading = false;
      this.hasError = true;

      this.cdr.detectChanges();

      return;
    }

    console.log('Loading case study with slug:', slug);

    this.caseStudyApi.getCaseStudyBySlug(slug).subscribe({

      next: (data) => {

        this.caseStudy = data;
        this.isLoading = false;
        this.hasError = false;

        console.log('Case Study Details API Response:', data);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Case Study Details API Error:', error);

        this.caseStudy = null;
        this.isLoading = false;
        this.hasError = true;

        this.cdr.detectChanges();
      }

    });
  }
}