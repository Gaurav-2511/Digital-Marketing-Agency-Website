package com.digitalmarketing.backend.controller.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.digitalmarketing.backend.dto.request.LeadRequest;
import com.digitalmarketing.backend.dto.response.LeadResponse;
import com.digitalmarketing.backend.entity.LeadStatus;
import com.digitalmarketing.backend.service.LeadService;

@RestController
@RequestMapping("/api/admin/leads")
public class AdminLeadController {

    private final LeadService leadService;

    public AdminLeadController(LeadService leadService) {
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

    @GetMapping
    public ResponseEntity<List<LeadResponse>> getAllLeads() {

        return ResponseEntity.ok(
                leadService.getAllLeads()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadResponse> getLeadById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leadService.getLeadById(id)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<LeadResponse>> getLeadsByStatus(
            @PathVariable LeadStatus status) {

        return ResponseEntity.ok(
                leadService.getLeadsByStatus(status)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeadResponse> updateLead(
            @PathVariable Long id,
            @Valid @RequestBody LeadRequest request) {

        return ResponseEntity.ok(
                leadService.updateLead(id, request)
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LeadResponse> updateLeadStatus(
            @PathVariable Long id,
            @RequestParam LeadStatus status) {

        return ResponseEntity.ok(
                leadService.updateLeadStatus(id, status)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(
            @PathVariable Long id) {

        leadService.deleteLead(id);

        return ResponseEntity.noContent().build();
    }
}