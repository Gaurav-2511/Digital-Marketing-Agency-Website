package com.digitalmarketing.backend.service;

import java.util.List;

import com.digitalmarketing.backend.dto.request.ConsultationRequestDto;
import com.digitalmarketing.backend.dto.request.ConsultationScheduleRequest;
import com.digitalmarketing.backend.dto.response.ConsultationResponseDto;
import com.digitalmarketing.backend.entity.ConsultationStatus;

public interface ConsultationRequestService {

    ConsultationResponseDto createConsultation(
            ConsultationRequestDto request);

    List<ConsultationResponseDto> getAllConsultations();

    List<ConsultationResponseDto> getConsultationsByStatus(
            ConsultationStatus status);

    ConsultationResponseDto getConsultationById(Long id);

    ConsultationResponseDto updateConsultationStatus(
            Long id, ConsultationStatus status);

    ConsultationResponseDto scheduleConsultation(
            Long id, ConsultationScheduleRequest request);

    void deleteConsultation(Long id);
}