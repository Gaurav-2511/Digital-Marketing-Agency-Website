package com.digitalmarketing.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.digitalmarketing.backend.dto.request.CaseStudyRequest;
import com.digitalmarketing.backend.dto.response.CaseStudyResponse;
import com.digitalmarketing.backend.entity.CaseStudy;
import com.digitalmarketing.backend.exception.ResourceNotFoundException;
import com.digitalmarketing.backend.repository.CaseStudyRepository;
import com.digitalmarketing.backend.service.CaseStudyService;

@Service
public class CaseStudyServiceImpl implements CaseStudyService {

	private final CaseStudyRepository caseStudyRepository;

	public CaseStudyServiceImpl(CaseStudyRepository caseStudyRepository) {
		this.caseStudyRepository = caseStudyRepository;
	}

	@Override
	public CaseStudyResponse createCaseStudy(CaseStudyRequest request) {

		if (caseStudyRepository.existsBySlug(request.getSlug())) {
			throw new IllegalArgumentException("Case study with slug '" + request.getSlug() + "' already exists");
		}

		CaseStudy caseStudy = mapRequestToEntity(request);

		CaseStudy savedCaseStudy = caseStudyRepository.save(caseStudy);

		return mapEntityToResponse(savedCaseStudy);
	}

	@Override
	@Transactional(readOnly = true)
	public List<CaseStudyResponse> getAllCaseStudies() {

		return caseStudyRepository.findAll().stream().map(this::mapEntityToResponse).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public CaseStudyResponse getCaseStudyById(Long id) {
		CaseStudy caseStudy = caseStudyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Case study not found with id: " + id));

		return mapEntityToResponse(caseStudy);
	}

	@Override
	@Transactional(readOnly = true)
	public CaseStudyResponse getActiveCaseStudyById(Long id) {
		CaseStudy caseStudy = caseStudyRepository.findByIdAndActiveTrue(id)
				.orElseThrow(() -> new ResourceNotFoundException("Active case study not found with id: " + id));

		return mapEntityToResponse(caseStudy);
	}

	@Override
	public CaseStudyResponse updateCaseStudy(Long id, CaseStudyRequest request) {
		CaseStudy caseStudy = caseStudyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Case study not found with id: " + id));

		if (!caseStudy.getSlug().equals(request.getSlug()) && caseStudyRepository.existsBySlug(request.getSlug())) {

			throw new IllegalArgumentException("Case study with slug '" + request.getSlug() + "' already exists");
		}

		mapRequestToExistingEntity(caseStudy, request);

		CaseStudy updatedCaseStudy = caseStudyRepository.save(caseStudy);

		return mapEntityToResponse(updatedCaseStudy);
	}

	@Override
	public void deleteCaseStudy(Long id) {
		CaseStudy caseStudy = caseStudyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Case study not found with id: " + id));

		caseStudyRepository.delete(caseStudy);
	}

	@Override
	public CaseStudyResponse updateCaseStudyStatus(Long id, boolean active) {
		CaseStudy caseStudy = caseStudyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Case study not found with id: " + id));

		caseStudy.setActive(active);

		CaseStudy updatedCaseStudy = caseStudyRepository.save(caseStudy);

		return mapEntityToResponse(updatedCaseStudy);
	}

	@Override
	@Transactional(readOnly = true)
	public List<CaseStudyResponse> getActiveCaseStudies() {
		return caseStudyRepository.findByActiveTrue().stream().map(this::mapEntityToResponse).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public CaseStudyResponse getCaseStudyBySlug(String slug) {
		CaseStudy caseStudy = caseStudyRepository.findBySlugAndActiveTrue(slug)
				.orElseThrow(() -> new ResourceNotFoundException("Active case study not found with slug: " + slug));

		return mapEntityToResponse(caseStudy);
	}

	@Override
	@Transactional(readOnly = true)

	public List<CaseStudyResponse> getCaseStudiesByIndustry(String industry) {
		return caseStudyRepository.findByIndustryAndActiveTrue(industry).stream().map(this::mapEntityToResponse)
				.toList();
	}

	private CaseStudy mapRequestToEntity(CaseStudyRequest request) {

		CaseStudy caseStudy = new CaseStudy();

		caseStudy.setTitle(request.getTitle());
		caseStudy.setSlug(request.getSlug());
		caseStudy.setShortDescription(request.getShortDescription());
		caseStudy.setDescription(request.getDescription());
		caseStudy.setClientName(request.getClientName());
		caseStudy.setIndustry(request.getIndustry());
		caseStudy.setChallenge(request.getChallenge());
		caseStudy.setSolution(request.getSolution());
		caseStudy.setResults(request.getResults());
		caseStudy.setImageUrl(request.getImageUrl());
		caseStudy.setProjectUrl(request.getProjectUrl());

		caseStudy.setActive(request.getActive() != null ? request.getActive() : true);

		return caseStudy;
	}

	private void mapRequestToExistingEntity(CaseStudy caseStudy, CaseStudyRequest request) {

		caseStudy.setTitle(request.getTitle());
		caseStudy.setSlug(request.getSlug());
		caseStudy.setShortDescription(request.getShortDescription());
		caseStudy.setDescription(request.getDescription());
		caseStudy.setClientName(request.getClientName());
		caseStudy.setIndustry(request.getIndustry());
		caseStudy.setChallenge(request.getChallenge());
		caseStudy.setSolution(request.getSolution());
		caseStudy.setResults(request.getResults());
		caseStudy.setImageUrl(request.getImageUrl());
		caseStudy.setProjectUrl(request.getProjectUrl());

		if (request.getActive() != null) {
			caseStudy.setActive(request.getActive());
		}
	}

	private CaseStudyResponse mapEntityToResponse(CaseStudy caseStudy) {

		CaseStudyResponse response = new CaseStudyResponse();

		response.setId(caseStudy.getId());
		response.setTitle(caseStudy.getTitle());
		response.setSlug(caseStudy.getSlug());
		response.setShortDescription(caseStudy.getShortDescription());
		response.setDescription(caseStudy.getDescription());
		response.setClientName(caseStudy.getClientName());
		response.setIndustry(caseStudy.getIndustry());
		response.setChallenge(caseStudy.getChallenge());
		response.setSolution(caseStudy.getSolution());
		response.setResults(caseStudy.getResults());
		response.setImageUrl(caseStudy.getImageUrl());
		response.setProjectUrl(caseStudy.getProjectUrl());
		response.setActive(caseStudy.isActive());
		response.setCreatedAt(caseStudy.getCreatedAt());
		response.setUpdatedAt(caseStudy.getUpdatedAt());

		return response;
	}

}
