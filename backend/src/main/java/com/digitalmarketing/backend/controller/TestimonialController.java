package com.digitalmarketing.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.response.TestimonialResponse;
import com.digitalmarketing.backend.service.TestimonialService;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<List<TestimonialResponse>> getActiveTestimonials() {

        return ResponseEntity.ok(
                testimonialService.getActiveTestimonials()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialResponse> getTestimonialById(
            @PathVariable Long id) {

        TestimonialResponse testimonial =
                testimonialService.getTestimonialById(id);

        if (!testimonial.isActive()) {
            throw new com.digitalmarketing.backend.exception.ResourceNotFoundException(
                    "Testimonial not found with id: " + id
            );
        }

        return ResponseEntity.ok(testimonial);
    }
}
