import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BlogApi } from '../../core/services/blog-api';
import { Blog as BlogModel } from '../../core/models/blog.model';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {

  private readonly blogApi = inject(BlogApi);

  constructor(private cdr: ChangeDetectorRef) {}

  blogs: BlogModel[] = [];

  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadBlogs();
  }

  private loadBlogs(): void {

    this.isLoading = true;
    this.hasError = false;

    this.blogApi.getPublishedBlogs().subscribe({

      next: (data:any) => {

        this.blogs = data;
        this.isLoading = false;
        this.hasError = false;

        console.log('Blog Page API Response:', data);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Blog Page API Error:', error);

        this.blogs = [];
        this.isLoading = false;
        this.hasError = true;

        this.cdr.detectChanges();
      }

    });
  }
}