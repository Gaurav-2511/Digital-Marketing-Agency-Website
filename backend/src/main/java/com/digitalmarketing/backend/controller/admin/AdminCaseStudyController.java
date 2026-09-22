package com.digitalmarketing.backend.controller.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.request.CaseStudyRequest;
import com.digitalmarketing.backend.dto.response.CaseStudyResponse;
import com.digitalmarketing.backend.service.CaseStudyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/case-studies")
public class AdminCaseStudyController {

	private final CaseStudyService caseStudyService;

	public AdminCaseStudyController(CaseStudyService caseStudyService) {
		this.caseStudyService = caseStudyService;
	}

	@PostMapping
	public ResponseEntity<CaseStudyResponse> createCaseStudy(@Valid @RequestBody CaseStudyRequest request) {

		CaseStudyResponse response = caseStudyService.createCaseStudy(request);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<CaseStudyResponse>> getAllCaseStudies() {

		return ResponseEntity.ok(caseStudyService.getAllCaseStudies());
	}

	@GetMapping("/{id}")
	public ResponseEntity<CaseStudyResponse> getCaseStudyById(@PathVariable Long id) {

		return ResponseEntity.ok(caseStudyService.getCaseStudyById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<CaseStudyResponse> updateCaseStudy(@PathVariable Long id,
			@Valid @RequestBody CaseStudyRequest request) {

		return ResponseEntity.ok(caseStudyService.updateCaseStudy(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCaseStudy(@PathVariable Long id) {

		caseStudyService.deleteCaseStudy(id);

		return ResponseEntity.noContent().build();
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<CaseStudyResponse> updateCaseStudyStatus(@PathVariable Long id,
			@RequestParam boolean active) {

		return ResponseEntity.ok(caseStudyService.updateCaseStudyStatus(id, active));
	}
}
