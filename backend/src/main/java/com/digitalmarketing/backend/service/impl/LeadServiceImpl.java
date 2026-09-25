package com.digitalmarketing.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.digitalmarketing.backend.dto.request.LeadRequest;
import com.digitalmarketing.backend.dto.response.LeadResponse;
import com.digitalmarketing.backend.entity.Lead;
import com.digitalmarketing.backend.entity.LeadStatus;
import com.digitalmarketing.backend.exception.ResourceNotFoundException;
import com.digitalmarketing.backend.repository.LeadRepository;
import com.digitalmarketing.backend.service.LeadService;

@Service
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;

    public LeadServiceImpl(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Override
    public LeadResponse createLead(LeadRequest request) {

        Lead lead = new Lead();

        mapRequestToEntity(request, lead);

        Lead savedLead = leadRepository.save(lead);

        return mapEntityToResponse(savedLead);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LeadResponse> getAllLeads() {

        return leadRepository.findAll()
                .stream()
                .map(this::mapEntityToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public LeadResponse getLeadById(Long id) {

        Lead lead = findLeadById(id);

        return mapEntityToResponse(lead);
    }

    @Override
    public LeadResponse updateLead(Long id, LeadRequest request) {

        Lead lead = findLeadById(id);

        mapRequestToEntity(request, lead);

        Lead updatedLead = leadRepository.save(lead);

        return mapEntityToResponse(updatedLead);
    }

    @Override
    public void deleteLead(Long id) {

        Lead lead = findLeadById(id);

        leadRepository.delete(lead);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LeadResponse> getLeadsByStatus(LeadStatus status) {

        return leadRepository.findByStatus(status)
                .stream()
                .map(this::mapEntityToResponse)
                .toList();
    }

    @Override
    public LeadResponse updateLeadStatus(Long id, LeadStatus status) {

        Lead lead = findLeadById(id);

        lead.setStatus(status);

        Lead updatedLead = leadRepository.save(lead);

        return mapEntityToResponse(updatedLead);
    }

    private Lead findLeadById(Long id) {

        return leadRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Lead not found with id: " + id));
    }

    private void mapRequestToEntity(LeadRequest request, Lead lead) {

        lead.setName(request.getName());
        lead.setEmail(request.getEmail());
        lead.setPhone(request.getPhone());
        lead.setCompany(request.getCompany());
        lead.setService(request.getService());
        lead.setBudget(request.getBudget());
        lead.setMessage(request.getMessage());
    }

    private LeadResponse mapEntityToResponse(Lead lead) {

        LeadResponse response = new LeadResponse();

        response.setId(lead.getId());
        response.setName(lead.getName());
        response.setEmail(lead.getEmail());
        response.setPhone(lead.getPhone());
        response.setCompany(lead.getCompany());
        response.setService(lead.getService());
        response.setBudget(lead.getBudget());
        response.setMessage(lead.getMessage());
        response.setStatus(lead.getStatus());
        response.setCreatedAt(lead.getCreatedAt());
        response.setUpdatedAt(lead.getUpdatedAt());

        return response;
    }
}