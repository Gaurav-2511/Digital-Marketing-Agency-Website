package com.digitalmarketing.backend.controller.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.request.BlogCategoryRequest;
import com.digitalmarketing.backend.dto.response.BlogCategoryResponse;
import com.digitalmarketing.backend.service.BlogCategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/blog-categories")
public class AdminBlogCategoryController {

	private final BlogCategoryService blogCategoryService;

	public AdminBlogCategoryController(BlogCategoryService blogCategoryService) {
		this.blogCategoryService = blogCategoryService;
	}

	@PostMapping
	public ResponseEntity<BlogCategoryResponse> createCategory(@Valid @RequestBody BlogCategoryRequest request) {

		return ResponseEntity.status(HttpStatus.CREATED).body(blogCategoryService.createCategory(request));
	}

	@GetMapping
	public ResponseEntity<List<BlogCategoryResponse>> getAllCategories() {

		return ResponseEntity.ok(blogCategoryService.getAllCategories());
	}

	@GetMapping("/{id}")
	public ResponseEntity<BlogCategoryResponse> getCategoryById(@PathVariable Long id) {

		return ResponseEntity.ok(blogCategoryService.getCategoryById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<BlogCategoryResponse> updateCategory(@PathVariable Long id,
			@Valid @RequestBody BlogCategoryRequest request) {

		return ResponseEntity.ok(blogCategoryService.updateCategory(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {

		blogCategoryService.deleteCategory(id);

		return ResponseEntity.noContent().build();
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<BlogCategoryResponse> updateCategoryStatus(@PathVariable Long id,
			@RequestParam boolean active) {

		return ResponseEntity.ok(blogCategoryService.updateCategoryStatus(id, active));
	}
}
