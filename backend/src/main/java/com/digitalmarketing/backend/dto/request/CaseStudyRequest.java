package com.digitalmarketing.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CaseStudyRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title must not exceed 150 characters")
    private String title;

    @NotBlank(message = "Slug is required")
    @Size(max = 180, message = "Slug must not exceed 180 characters")
    private String slug;

    @NotBlank(message = "Short description is required")
    @Size(max = 300, message = "Short description must not exceed 300 characters")
    private String shortDescription;

    @NotBlank(message = "Description is required")
    private String description;

    @Size(max = 150, message = "Client name must not exceed 150 characters")
    private String clientName;

    @NotBlank(message = "Industry is required")
    @Size(max = 100, message = "Industry must not exceed 100 characters")
    private String industry;

    @NotBlank(message = "Challenge is required")
    private String challenge;

    @NotBlank(message = "Solution is required")
    private String solution;

    @NotBlank(message = "Results are required")
    private String results;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    @Size(max = 500, message = "Project URL must not exceed 500 characters")
    private String projectUrl;

    private Boolean active = true;
}