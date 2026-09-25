package com.digitalmarketing.backend.service;

import java.util.List;

import com.digitalmarketing.backend.dto.request.LeadRequest;
import com.digitalmarketing.backend.dto.response.LeadResponse;
import com.digitalmarketing.backend.entity.LeadStatus;

public interface LeadService {

    LeadResponse createLead(LeadRequest request);

    List<LeadResponse> getAllLeads();

    LeadResponse getLeadById(Long id);

    LeadResponse updateLead(Long id, LeadRequest request);

    void deleteLead(Long id);

    List<LeadResponse> getLeadsByStatus(LeadStatus status);

    LeadResponse updateLeadStatus(Long id, LeadStatus status);
}