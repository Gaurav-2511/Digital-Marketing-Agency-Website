package com.digitalmarketing.backend.service;

import java.util.List;

import com.digitalmarketing.backend.dto.request.TestimonialRequest;
import com.digitalmarketing.backend.dto.response.TestimonialResponse;

public interface TestimonialService {

	TestimonialResponse createTestimonial(TestimonialRequest request);

	List<TestimonialResponse> getAllTestimonials();

	TestimonialResponse getTestimonialById(Long id);

	TestimonialResponse updateTestimonial(Long id, TestimonialRequest request);

	void deleteTestimonial(Long id);

	List<TestimonialResponse> getActiveTestimonials();

	TestimonialResponse updateTestimonialStatus(Long id, boolean active);
}
