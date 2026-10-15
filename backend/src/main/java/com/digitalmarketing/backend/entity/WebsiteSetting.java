package com.digitalmarketing.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "website_settings")
@Getter
@Setter
@NoArgsConstructor
public class WebsiteSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String agencyName = "Digital Marketing Agency";

    @Column(length = 300)
    private String tagline;

    @Column(length = 500)
    private String logoUrl;

    @Column(length = 150)
    private String contactEmail;

    @Column(length = 30)
    private String phone;

    @Column(length = 500)
    private String address;

    @Column(length = 500)
    private String facebookUrl;

    @Column(length = 500)
    private String instagramUrl;

    @Column(length = 500)
    private String linkedinUrl;

    @Column(length = 500)
    private String youtubeUrl;

    @Column(length = 200)
    private String defaultMetaTitle;

    @Column(length = 500)
    private String defaultMetaDescription;

    @Column(length = 500)
    private String footerText;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}