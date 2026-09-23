package com.digitalmarketing.backend.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialResponse {

    private Long id;

    private String clientName;

    private String clientRole;

    private String companyName;

    private String content;

    private Integer rating;

    private String imageUrl;

    private boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}