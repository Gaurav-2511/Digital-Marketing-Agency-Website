package com.digitalmarketing.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.digitalmarketing.backend.dto.request.ConsultationRequestDto;
import com.digitalmarketing.backend.dto.request.ConsultationScheduleRequest;
import com.digitalmarketing.backend.dto.response.ConsultationResponseDto;
import com.digitalmarketing.backend.entity.ConsultationRequest;
import com.digitalmarketing.backend.entity.ConsultationStatus;
import com.digitalmarketing.backend.exception.ResourceNotFoundException;
import com.digitalmarketing.backend.repository.ConsultationRequestRepository;
import com.digitalmarketing.backend.service.ConsultationRequestService;

@Service
public class ConsultationRequestServiceImpl implements ConsultationRequestService {

	private final ConsultationRequestRepository consultationRepository;

	public ConsultationRequestServiceImpl(ConsultationRequestRepository consultationRepository) {
		this.consultationRepository = consultationRepository;
	}

	@Override
	public ConsultationResponseDto createConsultation(ConsultationRequestDto request) {

		ConsultationRequest consultation = new ConsultationRequest();

		consultation.setName(request.getName().trim());
		consultation.setEmail(request.getEmail().trim());
		consultation.setPhone(request.getPhone().trim());
		consultation.setCompany(trimToNull(request.getCompany()));
		consultation.setService(request.getService().trim());
		consultation.setMessage(trimToNull(request.getMessage()));
		consultation.setPreferredDateTime(request.getPreferredDateTime());
		consultation.setMeetingType(request.getMeetingType());

		// Public requests cannot choose their own status or admin notes.
		consultation.setStatus(ConsultationStatus.REQUESTED);

		ConsultationRequest saved = consultationRepository.save(consultation);

		return mapToResponse(saved);
	}

	@Override
	@Transactional(readOnly = true)
	public List<ConsultationResponseDto> getAllConsultations() {

		return consultationRepository.findAllByOrderByCreatedAtDesc().stream().map(this::mapToResponse).toList();
	}

	@Override
	@Transactional(readOnly = true)
	public List<ConsultationResponseDto> getConsultationsByStatus(ConsultationStatus status) {

		return consultationRepository.findByStatusOrderByCreatedAtDesc(status).stream().map(this::mapToResponse)
				.toList();
	}

	@Override
	@Transactional(readOnly = true)
	public ConsultationResponseDto getConsultationById(Long id) {

		return mapToResponse(findConsultationById(id));
	}

	@Override
	public ConsultationResponseDto updateConsultationStatus(Long id, ConsultationStatus status) {

		ConsultationRequest consultation = findConsultationById(id);

		consultation.setStatus(status);

		ConsultationRequest updated = consultationRepository.save(consultation);

		return mapToResponse(updated);
	}

	@Override
	public ConsultationResponseDto scheduleConsultation(Long id, ConsultationScheduleRequest request) {

		ConsultationRequest consultation = findConsultationById(id);

		consultation.setScheduledAt(request.getScheduledAt());
		consultation.setAdminNotes(trimToNull(request.getAdminNotes()));
		consultation.setStatus(ConsultationStatus.SCHEDULED);

		ConsultationRequest updated = consultationRepository.save(consultation);

		return mapToResponse(updated);
	}

	@Override
	public void deleteConsultation(Long id) {

		ConsultationRequest consultation = findConsultationById(id);

		consultationRepository.delete(consultation);
	}

	private ConsultationRequest findConsultationById(Long id) {

		return consultationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Consultation not found with id: " + id));
	}

	private String trimToNull(String value) {

		if (value == null || value.isBlank()) {
			return null;
		}

		return value.trim();
	}

	private ConsultationResponseDto mapToResponse(ConsultationRequest consultation) {

		ConsultationResponseDto response = new ConsultationResponseDto();

		response.setId(consultation.getId());
		response.setName(consultation.getName());
		response.setEmail(consultation.getEmail());
		response.setPhone(consultation.getPhone());
		response.setCompany(consultation.getCompany());
		response.setService(consultation.getService());
		response.setMessage(consultation.getMessage());
		response.setPreferredDateTime(consultation.getPreferredDateTime());
		response.setMeetingType(consultation.getMeetingType());
		response.setStatus(consultation.getStatus());
		response.setScheduledAt(consultation.getScheduledAt());
		response.setAdminNotes(consultation.getAdminNotes());
		response.setCreatedAt(consultation.getCreatedAt());
		response.setUpdatedAt(consultation.getUpdatedAt());

		return response;
	}
}
