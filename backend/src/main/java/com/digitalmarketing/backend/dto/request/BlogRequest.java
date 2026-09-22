package com.digitalmarketing.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogRequest {

    @NotBlank(message = "Blog title is required")
    @Size(max = 200, message = "Blog title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Blog slug is required")
    @Size(max = 220, message = "Blog slug must not exceed 220 characters")
    private String slug;

    @NotBlank(message = "Short description is required")
    @Size(max = 500, message = "Short description must not exceed 500 characters")
    private String shortDescription;

    @NotBlank(message = "Blog content is required")
    private String content;

    @Size(max = 500, message = "Featured image URL must not exceed 500 characters")
    private String featuredImage;

    @NotBlank(message = "Author is required")
    @Size(max = 150, message = "Author name must not exceed 150 characters")
    private String author;

    private Boolean published = false;

    @NotNull(message = "Category ID is required")
    private Long categoryId;
}