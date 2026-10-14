package com.digitalmarketing.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "consultation_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(length = 150)
    private String company;

    @Column(nullable = false, length = 150)
    private String service;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "preferred_date_time", nullable = false)
    private LocalDateTime preferredDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "meeting_type", nullable = false, length = 20)
    private MeetingType meetingType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ConsultationStatus status;

    @Column(name = "scheduled_at")
    private LocalDateTime scheduledAt;

    @Column(name = "admin_notes", columnDefinition = "TEXT")
    private String adminNotes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();

        if (status == null) {
            status = ConsultationStatus.REQUESTED;
        }

        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}