package com.digitalmarketing.backend.service;

import java.util.List;

import com.digitalmarketing.backend.dto.request.CaseStudyRequest;
import com.digitalmarketing.backend.dto.response.CaseStudyResponse;

public interface CaseStudyService {

	CaseStudyResponse createCaseStudy(CaseStudyRequest request);

	List<CaseStudyResponse> getAllCaseStudies();

	CaseStudyResponse getCaseStudyById(Long id);

	CaseStudyResponse getActiveCaseStudyById(Long id);

	CaseStudyResponse updateCaseStudy(Long id, CaseStudyRequest request);

	void deleteCaseStudy(Long id);

	CaseStudyResponse updateCaseStudyStatus(Long id, boolean active);

	List<CaseStudyResponse> getActiveCaseStudies();

	CaseStudyResponse getCaseStudyBySlug(String slug);

	List<CaseStudyResponse> getCaseStudiesByIndustry(String industry);

}
