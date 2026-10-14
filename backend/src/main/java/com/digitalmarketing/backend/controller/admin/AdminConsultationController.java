package com.digitalmarketing.backend.controller.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.request.ConsultationScheduleRequest;
import com.digitalmarketing.backend.dto.request.ConsultationStatusUpdateRequest;
import com.digitalmarketing.backend.dto.response.ConsultationResponseDto;
import com.digitalmarketing.backend.entity.ConsultationStatus;
import com.digitalmarketing.backend.service.ConsultationRequestService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/consultations")
public class AdminConsultationController {

	private final ConsultationRequestService consultationService;

	public AdminConsultationController(ConsultationRequestService consultationService) {
		this.consultationService = consultationService;
	}

	@GetMapping
	public ResponseEntity<List<ConsultationResponseDto>> getAllConsultations(
			@RequestParam(required = false) ConsultationStatus status) {

		if (status != null) {
			return ResponseEntity.ok(consultationService.getConsultationsByStatus(status));
		}

		return ResponseEntity.ok(consultationService.getAllConsultations());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ConsultationResponseDto> getConsultationById(@PathVariable Long id) {

		return ResponseEntity.ok(consultationService.getConsultationById(id));
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<ConsultationResponseDto> updateStatus(@PathVariable Long id,
			@Valid @RequestBody ConsultationStatusUpdateRequest request) {

		return ResponseEntity.ok(consultationService.updateConsultationStatus(id, request.getStatus()));
	}

	@PatchMapping("/{id}/schedule")
	public ResponseEntity<ConsultationResponseDto> scheduleConsultation(@PathVariable Long id,
			@Valid @RequestBody ConsultationScheduleRequest request) {

		return ResponseEntity.ok(consultationService.scheduleConsultation(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteConsultation(@PathVariable Long id) {

		consultationService.deleteConsultation(id);

		return ResponseEntity.noContent().build();
	}
}