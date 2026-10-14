package com.digitalmarketing.backend.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ConsultationScheduleRequest {
    @NotNull(message = "Scheduled date and time are required")
    @Future(message = "Scheduled date and time must be in the future")
    private LocalDateTime scheduledAt;

    @Size(max = 5000, message = "Admin notes must not exceed 5000 characters")
    private String adminNotes;
}
