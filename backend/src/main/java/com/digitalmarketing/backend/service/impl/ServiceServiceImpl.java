package com.digitalmarketing.backend.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.digitalmarketing.backend.dto.request.ServiceRequest;
import com.digitalmarketing.backend.dto.response.ServiceResponse;
import com.digitalmarketing.backend.entity.Service;
import com.digitalmarketing.backend.exception.ResourceNotFoundException;
import com.digitalmarketing.backend.repository.ServiceRepository;
import com.digitalmarketing.backend.service.ServiceService;

@org.springframework.stereotype.Service
@Transactional
public class ServiceServiceImpl implements ServiceService {

	private final ServiceRepository serviceRepository;

	public ServiceServiceImpl(ServiceRepository serviceRepository) {
		this.serviceRepository = serviceRepository;
	}

	@Override
	public ServiceResponse createService(ServiceRequest request) {

		if (serviceRepository.existsBySlug(request.getSlug())) {
			throw new IllegalArgumentException("Service already exists with slug: " + request.getSlug());
		}

		Service service = new Service();

		service.setTitle(request.getTitle());
		service.setSlug(request.getSlug());
		service.setShortDescription(request.getShortDescription());
		service.setDescription(request.getDescription());
		service.setIcon(request.getIcon());
		service.setImageUrl(request.getImageUrl());
		service.setActive(request.isActive());

		Service savedService = serviceRepository.save(service);

		return ServiceResponse.fromEntity(savedService);
	}

	@Override
	@Transactional(readOnly = true)
	public List<ServiceResponse> getAllServices() {

		return serviceRepository.findAll().stream().map(ServiceResponse::fromEntity).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse getServiceById(Long id) {
		Service service = serviceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

		return ServiceResponse.fromEntity(service);
	}

	@Override
	public ServiceResponse updateService(Long id, ServiceRequest request) {

		Service service = serviceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

		if (!service.getSlug().equals(request.getSlug()) && serviceRepository.existsBySlug(request.getSlug())) {
			throw new IllegalArgumentException("Service already exists with slug: " + request.getSlug());
		}

		service.setTitle(request.getTitle());
		service.setSlug(request.getSlug());
		service.setShortDescription(request.getShortDescription());
		service.setDescription(request.getDescription());
		service.setIcon(request.getIcon());
		service.setImageUrl(request.getImageUrl());
		service.setActive(request.isActive());

		Service updatedService = serviceRepository.save(service);

		return ServiceResponse.fromEntity(updatedService);
	}

	@Override
	public void deleteService(Long id) {
		Service service = serviceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

		serviceRepository.delete(service);
	}

	@Override
	public ServiceResponse updateServiceStatus(Long id, boolean active) {
		Service service = serviceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

		service.setActive(active);

		Service updatedService = serviceRepository.save(service);

		return ServiceResponse.fromEntity(updatedService);
	}

	@Override
	public List<ServiceResponse> getActiveServices() {

		return serviceRepository.findByActiveTrue().stream().map(ServiceResponse::fromEntity).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse getServiceBySlug(String slug) {

		Service service = serviceRepository.findBySlugAndActiveTrue(slug)
				.orElseThrow(() -> new ResourceNotFoundException("Active service not found with slug: " + slug));

		return ServiceResponse.fromEntity(service);
	}

}
