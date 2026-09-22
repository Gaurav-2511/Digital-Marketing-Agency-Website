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
public class BlogResponse {

	private Long id;

	private String title;

	private String slug;

	private String shortDescription;

	private String content;

	private String featuredImage;

	private String author;

	private boolean published;

	private Long categoryId;

	private String categoryName;

	private String categorySlug;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;
}
