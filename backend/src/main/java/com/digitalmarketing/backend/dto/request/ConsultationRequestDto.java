package com.digitalmarketing.backend.dto.request;

import java.time.LocalDateTime;

import com.digitalmarketing.backend.entity.MeetingType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationRequestDto {

    @NotBlank(message = "Name is required")
    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;

    @NotBlank(message = "Phone is required")
    @Size(max = 20, message = "Phone must not exceed 20 characters")
    private String phone;

    @Size(max = 150, message = "Company must not exceed 150 characters")
    private String company;

    @NotBlank(message = "Service is required")
    @Size(max = 150, message = "Service must not exceed 150 characters")
    private String service;

    @Size(max = 5000, message = "Message must not exceed 5000 characters")
    private String message;

    @NotNull(message = "Preferred date and time are required")
    @Future(message = "Preferred date and time must be in the future")
    private LocalDateTime preferredDateTime;

    @NotNull(message = "Meeting type is required")
    private MeetingType meetingType;
}