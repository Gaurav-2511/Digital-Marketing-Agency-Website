package com.digitalmarketing.backend.dto.request;

import com.digitalmarketing.backend.entity.ConsultationStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ConsultationStatusUpdateRequest {

    @NotNull(message = "Consultation status is required")
    private ConsultationStatus status;
}
