package com.digitalmarketing.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.request.ConsultationRequestDto;
import com.digitalmarketing.backend.dto.response.ConsultationResponseDto;
import com.digitalmarketing.backend.service.ConsultationRequestService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

	private final ConsultationRequestService consultationService;

	public ConsultationController(ConsultationRequestService consultationService) {
		this.consultationService = consultationService;
	}

	@PostMapping
	public ResponseEntity<ConsultationResponseDto> createConsultation(
			@Valid @RequestBody ConsultationRequestDto request) {

		ConsultationResponseDto response = consultationService.createConsultation(request);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
}