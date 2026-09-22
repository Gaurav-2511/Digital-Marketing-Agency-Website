package com.digitalmarketing.backend.service;

import java.util.List;

import com.digitalmarketing.backend.dto.request.BlogCategoryRequest;
import com.digitalmarketing.backend.dto.response.BlogCategoryResponse;

public interface BlogCategoryService {

    BlogCategoryResponse createCategory(BlogCategoryRequest request);

    List<BlogCategoryResponse> getAllCategories();

    BlogCategoryResponse getCategoryById(Long id);

    BlogCategoryResponse updateCategory(Long id, BlogCategoryRequest request);

    void deleteCategory(Long id);

    BlogCategoryResponse updateCategoryStatus(Long id, boolean active);

    List<BlogCategoryResponse> getActiveCategories();

    BlogCategoryResponse getCategoryBySlug(String slug);
}
