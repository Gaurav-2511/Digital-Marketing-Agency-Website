package com.digitalmarketing.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.request.LeadRequest;
import com.digitalmarketing.backend.dto.response.LeadResponse;
import com.digitalmarketing.backend.service.LeadService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping
    public ResponseEntity<LeadResponse> createLead(
            @Valid @RequestBody LeadRequest request) {

        LeadResponse response = leadService.createLead(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}