package com.digitalmarketing.backend.service;

import java.util.List;

import com.digitalmarketing.backend.dto.request.ServiceRequest;
import com.digitalmarketing.backend.dto.response.ServiceResponse;

public interface ServiceService {

    ServiceResponse createService(ServiceRequest request);

    List<ServiceResponse> getAllServices();

    ServiceResponse getServiceById(Long id);

    ServiceResponse updateService(Long id, ServiceRequest request);

    void deleteService(Long id);

    ServiceResponse updateServiceStatus(Long id, boolean active);

    List<ServiceResponse> getActiveServices();

    ServiceResponse getServiceBySlug(String slug);

}
