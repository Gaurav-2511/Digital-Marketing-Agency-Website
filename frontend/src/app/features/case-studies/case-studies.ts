import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CaseStudyApi } from '../../core/services/case-study-api';
import { CaseStudy } from '../../core/models/case-study.model';

@Component({
  selector: 'app-case-studies',
  imports: [RouterLink],
  templateUrl: './case-studies.html',
  styleUrl: './case-studies.css',
})
export class CaseStudies implements OnInit {

  private readonly caseStudyApi = inject(CaseStudyApi);

  constructor(private cdr: ChangeDetectorRef) { }

  caseStudies: CaseStudy[] = [];

  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadCaseStudies();
  }

  private loadCaseStudies(): void {

    this.isLoading = true;
    this.hasError = false;

    this.caseStudyApi.getActiveCaseStudies().subscribe({

      next: (data) => {

        this.caseStudies = data;
        this.isLoading = false;

        console.log('Case Studies Page API Response:', data);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Case Studies Page API Error:', error);

        this.caseStudies = [];
        this.isLoading = false;
        this.hasError = true;

        this.cdr.detectChanges();
      }

    });
  }
}
