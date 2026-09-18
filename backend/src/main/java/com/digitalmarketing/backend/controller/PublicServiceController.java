package com.digitalmarketing.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.response.ServiceResponse;
import com.digitalmarketing.backend.service.ServiceService;

@RestController
@RequestMapping("/api/services")
public class PublicServiceController {

	private final ServiceService serviceService;

	public PublicServiceController(ServiceService serviceService) {
		this.serviceService = serviceService;
	}

	@GetMapping
	public ResponseEntity<List<ServiceResponse>> getActiveServices() {
		List<ServiceResponse> services = serviceService.getActiveServices();

		return ResponseEntity.ok(services);
	}

	
	@GetMapping("/{slug}")
	public ResponseEntity<ServiceResponse> getServiceBySlug(@PathVariable String slug) {

		ServiceResponse response = serviceService.getServiceBySlug(slug);

		return ResponseEntity.ok(response);
	}
}
