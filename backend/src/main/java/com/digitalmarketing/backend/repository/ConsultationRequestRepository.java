package com.digitalmarketing.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digitalmarketing.backend.entity.ConsultationRequest;
import com.digitalmarketing.backend.entity.ConsultationStatus;

@Repository
public interface ConsultationRequestRepository
        extends JpaRepository<ConsultationRequest, Long> {

    List<ConsultationRequest> findAllByOrderByCreatedAtDesc();

    List<ConsultationRequest> findByStatusOrderByCreatedAtDesc(
            ConsultationStatus status);
}