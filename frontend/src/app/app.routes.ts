import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Services } from './features/services/services';
import { Portfolio } from './features/portfolio/portfolio';
import { CaseStudies } from './features/case-studies/case-studies';
import { Testimonials } from './features/testimonials/testimonials';
import { Blog } from './features/blog/blog';
import { Contact } from './features/contact/contact';
import { ServiceDetails } from './features/service-details/service-details';
import { PortfolioDetails } from './features/portfolio-details/portfolio-details';
import { CaseStudyDetails } from './features/case-study-details/case-study-details';
import { BlogDetails } from './features/blog-details/blog-details';

export const routes: Routes =
  [
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
    { path: '**', redirectTo: '' }
  ];
