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
public class BlogCategoryRequest {

	@NotBlank(message = "Category name is required")
	@Size(max = 100, message = "Category name must not exceed 100 characters")
	private String name;

	@NotBlank(message = "Category slug is required")
	@Size(max = 120, message = "Category slug must not exceed 120 characters")
	private String slug;

	private Boolean active = true;
}
