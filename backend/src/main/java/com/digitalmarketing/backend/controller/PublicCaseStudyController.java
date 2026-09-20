package com.digitalmarketing.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.response.CaseStudyResponse;
import com.digitalmarketing.backend.service.CaseStudyService;

@RestController
@RequestMapping("/api/case-studies")
public class PublicCaseStudyController {

	private final CaseStudyService caseStudyService;

	public PublicCaseStudyController(CaseStudyService caseStudyService) {
		this.caseStudyService = caseStudyService;
	}

	@GetMapping
	public ResponseEntity<List<CaseStudyResponse>> getActiveCaseStudies() {

		return ResponseEntity.ok(caseStudyService.getActiveCaseStudies());
	}

	@GetMapping("/{id}")
	public ResponseEntity<CaseStudyResponse> getCaseStudyById(@PathVariable Long id) {

		return ResponseEntity.ok(caseStudyService.getActiveCaseStudyById(id));
	}

	@GetMapping("/slug/{slug}")
	public ResponseEntity<CaseStudyResponse> getCaseStudyBySlug(@PathVariable String slug) {

		return ResponseEntity.ok(caseStudyService.getCaseStudyBySlug(slug));
	}

	@GetMapping("/industry/{industry}")
	public ResponseEntity<List<CaseStudyResponse>> getCaseStudiesByIndustry(@PathVariable String industry) {

		return ResponseEntity.ok(caseStudyService.getCaseStudiesByIndustry(industry));
	}
}