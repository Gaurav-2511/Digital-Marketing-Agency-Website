package com.digitalmarketing.backend.dto.response;

import java.time.LocalDateTime;

import com.digitalmarketing.backend.entity.ConsultationStatus;
import com.digitalmarketing.backend.entity.MeetingType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationResponseDto {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String company;
    private String service;
    private String message;
    private LocalDateTime preferredDateTime;
    private MeetingType meetingType;
    private ConsultationStatus status;
    private LocalDateTime scheduledAt;
    private String adminNotes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
