package com.digitalmarketing.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.response.BlogResponse;
import com.digitalmarketing.backend.service.BlogService;

@RestController
@RequestMapping("/api/blogs")
public class PublicBlogController {

	 private final BlogService blogService;

	    public PublicBlogController(BlogService blogService) {
	        this.blogService = blogService;
	    }

	    @GetMapping
	    public ResponseEntity<List<BlogResponse>> getPublishedBlogs() {

	        List<BlogResponse> response = blogService.getPublishedBlogs();

	        return ResponseEntity.ok(response);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<BlogResponse> getPublishedBlogById(
	            @PathVariable Long id) {

	        BlogResponse response = blogService.getPublishedBlogById(id);

	        return ResponseEntity.ok(response);
	    }

	    @GetMapping("/slug/{slug}")
	    public ResponseEntity<BlogResponse> getPublishedBlogBySlug(
	            @PathVariable String slug) {

	        BlogResponse response = blogService.getPublishedBlogBySlug(slug);

	        return ResponseEntity.ok(response);
	    }

	    @GetMapping("/category/{categoryId}")
	    public ResponseEntity<List<BlogResponse>> getPublishedBlogsByCategory(
	            @PathVariable Long categoryId) {

	        List<BlogResponse> response =
	                blogService.getPublishedBlogsByCategory(categoryId);

	        return ResponseEntity.ok(response);
	    }
}
