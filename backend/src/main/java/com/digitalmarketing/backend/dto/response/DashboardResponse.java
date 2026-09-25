package com.digitalmarketing.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private long totalLeads;
    private long newLeads;
    private long contactedLeads;
    private long inProgressLeads;
    private long convertedLeads;
    private long rejectedLeads;

    private long totalServices;
    private long totalPortfolioProjects;
    private long totalCaseStudies;
    private long totalBlogs;
    private long totalTestimonials;
}