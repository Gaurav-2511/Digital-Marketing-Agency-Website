package com.digitalmarketing.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.digitalmarketing.backend.dto.request.TestimonialRequest;
import com.digitalmarketing.backend.dto.response.TestimonialResponse;
import com.digitalmarketing.backend.entity.Testimonial;
import com.digitalmarketing.backend.exception.ResourceNotFoundException;
import com.digitalmarketing.backend.repository.TestimonialRepository;
import com.digitalmarketing.backend.service.TestimonialService;

@Service
public class TestimonialServiceImpl implements TestimonialService{

	 private final TestimonialRepository testimonialRepository;

	    public TestimonialServiceImpl(TestimonialRepository testimonialRepository) {
	        this.testimonialRepository = testimonialRepository;
	    }
	    
	    
	    @Override
	    public TestimonialResponse createTestimonial(TestimonialRequest request) {

	        Testimonial testimonial = new Testimonial();

	        testimonial.setClientName(request.getClientName());
	        testimonial.setClientRole(request.getClientRole());
	        testimonial.setCompanyName(request.getCompanyName());
	        testimonial.setContent(request.getContent());
	        testimonial.setRating(request.getRating());
	        testimonial.setImageUrl(request.getImageUrl());

	        if (request.getActive() != null) {
	            testimonial.setActive(request.getActive());
	        } else {
	            testimonial.setActive(true);
	        }

	        Testimonial savedTestimonial = testimonialRepository.save(testimonial);

	        return mapToResponse(savedTestimonial);
	    }

	    @Override
	    @Transactional(readOnly = true)
	    public List<TestimonialResponse> getAllTestimonials() {

	        return testimonialRepository.findAll()
	                .stream()
	                .map(this::mapToResponse)
	                .toList();
	    }

	    @Override
	    @Transactional(readOnly = true)
	    public TestimonialResponse getTestimonialById(Long id) {

	        Testimonial testimonial = testimonialRepository.findById(id)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Testimonial not found with id: " + id));

	        return mapToResponse(testimonial);
	    }

	    @Override
	    public TestimonialResponse updateTestimonial(
	            Long id,
	            TestimonialRequest request) {

	        Testimonial testimonial = testimonialRepository.findById(id)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Testimonial not found with id: " + id));

	        testimonial.setClientName(request.getClientName());
	        testimonial.setClientRole(request.getClientRole());
	        testimonial.setCompanyName(request.getCompanyName());
	        testimonial.setContent(request.getContent());
	        testimonial.setRating(request.getRating());
	        testimonial.setImageUrl(request.getImageUrl());

	        if (request.getActive() != null) {
	            testimonial.setActive(request.getActive());
	        }

	        Testimonial updatedTestimonial =
	                testimonialRepository.save(testimonial);

	        return mapToResponse(updatedTestimonial);
	    }

	    @Override
	    public void deleteTestimonial(Long id) {

	        Testimonial testimonial = testimonialRepository.findById(id)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Testimonial not found with id: " + id));

	        testimonialRepository.delete(testimonial);
	    }

	    @Override
	    @Transactional(readOnly = true)
	    public List<TestimonialResponse> getActiveTestimonials() {

	        return testimonialRepository.findByActiveTrue()
	                .stream()
	                .map(this::mapToResponse)
	                .toList();
	    }

	    @Override
	    public TestimonialResponse updateTestimonialStatus(
	            Long id,
	            boolean active) {

	        Testimonial testimonial = testimonialRepository.findById(id)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Testimonial not found with id: " + id));

	        testimonial.setActive(active);

	        Testimonial updatedTestimonial =
	                testimonialRepository.save(testimonial);

	        return mapToResponse(updatedTestimonial);
	    }

	    private TestimonialResponse mapToResponse(Testimonial testimonial) {

	        TestimonialResponse response = new TestimonialResponse();

	        response.setId(testimonial.getId());
	        response.setClientName(testimonial.getClientName());
	        response.setClientRole(testimonial.getClientRole());
	        response.setCompanyName(testimonial.getCompanyName());
	        response.setContent(testimonial.getContent());
	        response.setRating(testimonial.getRating());
	        response.setImageUrl(testimonial.getImageUrl());
	        response.setActive(testimonial.isActive());
	        response.setCreatedAt(testimonial.getCreatedAt());
	        response.setUpdatedAt(testimonial.getUpdatedAt());

	        return response;
	    }
}
