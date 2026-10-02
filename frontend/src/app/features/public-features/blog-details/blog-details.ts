import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogApi } from '../../../core/services/blog-api';
import { Blog } from '../../../core/models/blog.model';

@Component({
  selector: 'app-blog-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails implements OnInit {

  private readonly blogApi = inject(BlogApi);
  private readonly route = inject(ActivatedRoute);

  constructor(private cdr: ChangeDetectorRef) { }

  blog: Blog | null = null;

  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadBlogDetails();
  }

  private loadBlogDetails(): void {

    this.isLoading = true;
    this.hasError = false;

    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {

      console.error('Blog slug is missing.');

      this.isLoading = false;
      this.hasError = true;

      this.cdr.detectChanges();

      return;
    }

    console.log('Loading blog with slug:', slug);

    this.blogApi.getPublishedBlogBySlug(slug).subscribe({

      next: (data) => {

        this.blog = data;

        this.isLoading = false;
        this.hasError = false;

        console.log('Blog Details API Response:', data);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Blog Details API Error:', error);

        this.blog = null;
        this.isLoading = false;
        this.hasError = true;

        this.cdr.detectChanges();
      }

    });
  }
}