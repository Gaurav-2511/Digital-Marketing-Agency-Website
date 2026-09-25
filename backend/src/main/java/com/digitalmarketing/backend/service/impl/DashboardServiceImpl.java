package com.digitalmarketing.backend.service.impl;

import org.springframework.stereotype.Service;

import com.digitalmarketing.backend.dto.response.DashboardResponse;
import com.digitalmarketing.backend.entity.LeadStatus;
import com.digitalmarketing.backend.repository.BlogRepository;
import com.digitalmarketing.backend.repository.CaseStudyRepository;
import com.digitalmarketing.backend.repository.LeadRepository;
import com.digitalmarketing.backend.repository.PortfolioRepository;
import com.digitalmarketing.backend.repository.ServiceRepository;
import com.digitalmarketing.backend.repository.TestimonialRepository;
import com.digitalmarketing.backend.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

	private final LeadRepository leadRepository;
	private final ServiceRepository serviceRepository;
	private final PortfolioRepository portfolioRepository;
	private final CaseStudyRepository caseStudyRepository;
	private final BlogRepository blogRepository;
	private final TestimonialRepository testimonialRepository;

	public DashboardServiceImpl(LeadRepository leadRepository, ServiceRepository serviceRepository,
			PortfolioRepository portfolioRepository, CaseStudyRepository caseStudyRepository,
			BlogRepository blogRepository, TestimonialRepository testimonialRepository) {

		this.leadRepository = leadRepository;
		this.serviceRepository = serviceRepository;
		this.portfolioRepository = portfolioRepository;
		this.caseStudyRepository = caseStudyRepository;
		this.blogRepository = blogRepository;
		this.testimonialRepository = testimonialRepository;
	}

	@Override
	public DashboardResponse getDashboardStatistics() {

		long totalLeads = leadRepository.count();

		long newLeads = leadRepository.countByStatus(LeadStatus.NEW);

		long contactedLeads = leadRepository.countByStatus(LeadStatus.CONTACTED);

		long inProgressLeads = leadRepository.countByStatus(LeadStatus.IN_PROGRESS);

		long convertedLeads = leadRepository.countByStatus(LeadStatus.CONVERTED);

		long rejectedLeads = leadRepository.countByStatus(LeadStatus.REJECTED);

		long totalServices = serviceRepository.count();

		long totalPortfolioProjects = portfolioRepository.count();

		long totalCaseStudies = caseStudyRepository.count();

		long totalBlogs = blogRepository.count();

		long totalTestimonials = testimonialRepository.count();

		return new DashboardResponse(totalLeads, newLeads, contactedLeads, inProgressLeads, convertedLeads,
				rejectedLeads, totalServices, totalPortfolioProjects, totalCaseStudies, totalBlogs, totalTestimonials);
	}
}