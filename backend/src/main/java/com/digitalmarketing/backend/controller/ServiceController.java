package com.digitalmarketing.backend.controller;

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

import com.digitalmarketing.backend.dto.request.ServiceRequest;
import com.digitalmarketing.backend.dto.response.ServiceResponse;
import com.digitalmarketing.backend.service.ServiceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/services")
public class ServiceController {

	private final ServiceService serviceService;

	public ServiceController(ServiceService serviceService) {
		this.serviceService = serviceService;
	}

	// create service
	@PostMapping
	public ResponseEntity<ServiceResponse> createService(@Valid @RequestBody ServiceRequest request) {
		ServiceResponse response = serviceService.createService(request);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	// get all services
	@GetMapping
	public ResponseEntity<List<ServiceResponse>> getAllServices() {

		List<ServiceResponse> services = serviceService.getAllServices();

		return ResponseEntity.ok(services);
	}

	//get service by id
	@GetMapping("/{id}")
	public ResponseEntity<ServiceResponse> getServiceById(@PathVariable Long id) {

		ServiceResponse response = serviceService.getServiceById(id);

		return ResponseEntity.ok(response);
	}

	// update service
	@PutMapping("/{id}")
	public ResponseEntity<ServiceResponse> updateService(@PathVariable Long id,
			@Valid @RequestBody ServiceRequest request) {

		ServiceResponse response = serviceService.updateService(id, request);

		return ResponseEntity.ok(response);
	}
	
	//delete service
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteService(@PathVariable Long id) {

		serviceService.deleteService(id);

		return ResponseEntity.noContent().build();
	}

	//update service status
	@PatchMapping("/{id}/status")
	public ResponseEntity<ServiceResponse> updateServiceStatus(@PathVariable Long id, @RequestParam boolean active) {

		ServiceResponse response = serviceService.updateServiceStatus(id, active);

		return ResponseEntity.ok(response);
	}
}
