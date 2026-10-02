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
