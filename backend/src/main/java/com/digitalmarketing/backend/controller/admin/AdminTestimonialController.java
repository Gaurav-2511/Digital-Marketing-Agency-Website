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

import com.digitalmarketing.backend.dto.request.TestimonialRequest;
import com.digitalmarketing.backend.dto.response.TestimonialResponse;
import com.digitalmarketing.backend.service.TestimonialService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/testimonials")
public class AdminTestimonialController {

	  private final TestimonialService testimonialService;

	    public AdminTestimonialController(TestimonialService testimonialService) {
	        this.testimonialService = testimonialService;
	    }

	    @PostMapping
	    public ResponseEntity<TestimonialResponse> createTestimonial(
	            @Valid @RequestBody TestimonialRequest request) {

	        TestimonialResponse response =
	                testimonialService.createTestimonial(request);

	        return ResponseEntity
	                .status(HttpStatus.CREATED)
	                .body(response);
	    }

	    @GetMapping
	    public ResponseEntity<List<TestimonialResponse>> getAllTestimonials() {

	        return ResponseEntity.ok(
	                testimonialService.getAllTestimonials()
	        );
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<TestimonialResponse> getTestimonialById(
	            @PathVariable Long id) {

	        return ResponseEntity.ok(
	                testimonialService.getTestimonialById(id)
	        );
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<TestimonialResponse> updateTestimonial(
	            @PathVariable Long id,
	            @Valid @RequestBody TestimonialRequest request) {

	        return ResponseEntity.ok(
	                testimonialService.updateTestimonial(id, request)
	        );
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteTestimonial(
	            @PathVariable Long id) {

	        testimonialService.deleteTestimonial(id);

	        return ResponseEntity.noContent().build();
	    }

	    @PatchMapping("/{id}/status")
	    public ResponseEntity<TestimonialResponse> updateTestimonialStatus(
	            @PathVariable Long id,
	            @RequestParam boolean active) {

	        return ResponseEntity.ok(
	                testimonialService.updateTestimonialStatus(id, active)
	        );
	    }
	
}
