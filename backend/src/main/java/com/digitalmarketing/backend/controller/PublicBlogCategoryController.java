package com.digitalmarketing.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.response.BlogCategoryResponse;
import com.digitalmarketing.backend.service.BlogCategoryService;

@RestController
@RequestMapping("/api/blog-categories")
public class PublicBlogCategoryController {

    private final BlogCategoryService blogCategoryService;

    public PublicBlogCategoryController(
            BlogCategoryService blogCategoryService) {
        this.blogCategoryService = blogCategoryService;
    }

    @GetMapping
    public ResponseEntity<List<BlogCategoryResponse>> getActiveCategories() {

        return ResponseEntity.ok(
                blogCategoryService.getActiveCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogCategoryResponse> getCategoryById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                blogCategoryService.getCategoryById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogCategoryResponse> getCategoryBySlug(
            @PathVariable String slug) {

        return ResponseEntity.ok(
                blogCategoryService.getCategoryBySlug(slug));
    }
}