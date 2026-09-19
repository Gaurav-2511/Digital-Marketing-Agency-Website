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
public class PortfolioResponse {
	
    private Long id;

    private String title;

    private String slug;

    private String shortDescription;

    private String description;

    private String clientName;

    private String category;

    private String imageUrl;

    private String projectUrl;

    private boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
