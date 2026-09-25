package com.digitalmarketing.backend.dto.response;

import java.time.LocalDateTime;

import com.digitalmarketing.backend.entity.LeadStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeadResponse {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String company;

    private String service;

    private String budget;

    private String message;

    private LeadStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}