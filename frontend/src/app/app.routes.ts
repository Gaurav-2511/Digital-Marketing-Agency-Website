
// =========================
// Public imports
// =========================

import { Routes } from '@angular/router';
import { Home } from './features/public-features/home/home';
import { About } from './features/public-features/about/about';
import { Services } from './features/public-features/services/services';
import { ServiceDetails } from './features/public-features/service-details/service-details';
import { Portfolio } from './features/public-features/portfolio/portfolio';
import { PortfolioDetails } from './features/public-features/portfolio-details/portfolio-details';
import { CaseStudies } from './features/public-features/case-studies/case-studies';
import { CaseStudyDetails } from './features/public-features/case-study-details/case-study-details';
import { Testimonials } from './features/public-features/testimonials/testimonials';
import { Blog } from './features/public-features/blog/blog';
import { BlogDetails } from './features/public-features/blog-details/blog-details';
import { Contact } from './features/public-features/contact/contact';

// =========================
// Admin imports
// =========================
import { Login } from './features/admin-features/login/login';
import { Layout } from './features/admin-features/layout/layout';
import { Dashboard } from './features/admin-features/dashboard/dashboard';
import { Blogs } from './features/admin-features/blogs/blogs';
import { Leads } from './features/admin-features/leads/leads';
import { Consultations } from './features/admin-features/consultations/consultations';
import { Settings } from './features/admin-features/settings/settings';
import { Services as AdminServices } from './features/admin-features/services/services';
import { Portfolio as AdminPortfolio } from './features/admin-features/portfolio/portfolio';
import { CaseStudies as AdminCaseStudies } from './features/admin-features/case-studies/case-studies';
import { Testimonials as AdminTestimonials } from './features/admin-features/testimonials/testimonials';
import { BlogCategories } from './features/admin-features/blog-categories/blog-categories';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes =
  [
    // =========================
    // Public Routes
    // =========================
    { path: '', component: Home, title: 'Digital Marketing Agency' },
    { path: 'about', component: About, title: 'About Us | Digital Marketing Agency' },
    { path: 'services', component: Services, title: 'Services | Digital Marketing Agency' },
    { path: 'services/:slug', component: ServiceDetails, title: 'Service Details | Digital Marketing Agency' },
    { path: 'portfolio', component: Portfolio, title: 'Portfolio | Digital Marketing Agency' },
    { path: 'portfolio/:slug', component: PortfolioDetails, title: 'Portfolio Details | Digital Marketing Agency' },
    { path: 'case-studies', component: CaseStudies, title: 'Case Studies | Digital Marketing Agency' },
    { path: 'case-studies/:slug', component: CaseStudyDetails, title: 'Case Study Details | Digital Marketing Agency' },
    { path: 'testimonials', component: Testimonials, title: 'Testimonials | Digital Marketing Agency' },
    { path: 'blog', component: Blog, title: 'Blog | Digital Marketing Agency' },
    { path: 'blog/:slug', component: BlogDetails, title: 'Blog Details | Digital Marketing Agency' },
    { path: 'contact', component: Contact, title: 'Contact Us | Digital Marketing Agency' },

    // =========================
    // Admin Routes
    // =========================
    { path: 'admin/login', component: Login, title: 'Admin Login | Digital Marketing Agency' },
    {
      path: 'admin', component: Layout, canActivate: [authGuard, roleGuard],
      children: [
        { path: 'dashboard', component: Dashboard, title: 'Dashboard | Admin' },
        { path: 'services', component: AdminServices, title: 'Services | Admin' },
        { path: 'portfolio', component: AdminPortfolio, title: 'Portfolio | Admin' },
        { path: 'case-studies', component: AdminCaseStudies, title: 'Case Studies | Admin' },
        { path: 'blogs', component: Blogs, title: 'Blogs | Admin' },
        { path: 'blog-categories', component: BlogCategories, title: 'Blog Categories | Admin', },
        { path: 'testimonials', component: AdminTestimonials, title: 'Testimonials | Admin' },
        { path: 'leads', component: Leads, title: 'Leads | Admin' },
        { path: 'consultations', component: Consultations, title: 'Consultations | Admin' },
        { path: 'settings', component: Settings, title: 'Settings | Admin' }
      ]
    },
    { path: '**', redirectTo: '' }
  ];
