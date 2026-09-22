package com.digitalmarketing.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.digitalmarketing.backend.dto.request.BlogCategoryRequest;
import com.digitalmarketing.backend.dto.response.BlogCategoryResponse;
import com.digitalmarketing.backend.entity.BlogCategory;
import com.digitalmarketing.backend.exception.ResourceNotFoundException;
import com.digitalmarketing.backend.repository.BlogCategoryRepository;
import com.digitalmarketing.backend.service.BlogCategoryService;

@Service
public class BlogCategoryServiceImpl implements BlogCategoryService {

    private final BlogCategoryRepository blogCategoryRepository;

    public BlogCategoryServiceImpl(BlogCategoryRepository blogCategoryRepository) {
        this.blogCategoryRepository = blogCategoryRepository;
    }

    @Override
    public BlogCategoryResponse createCategory(BlogCategoryRequest request) {

        if (blogCategoryRepository.existsBySlug(request.getSlug())) {
            throw new IllegalArgumentException(
                    "Category with slug already exists: " + request.getSlug());
        }

        BlogCategory category = new BlogCategory();

        category.setName(request.getName());
        category.setSlug(request.getSlug());

        if (request.getActive() != null) {
            category.setActive(request.getActive());
        }

        BlogCategory savedCategory = blogCategoryRepository.save(category);

        return mapToResponse(savedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BlogCategoryResponse> getAllCategories() {

        return blogCategoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public BlogCategoryResponse getCategoryById(Long id) {

        BlogCategory category = blogCategoryRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog category not found with id: " + id));

        return mapToResponse(category);
    }

    @Override
    public BlogCategoryResponse updateCategory(
            Long id,
            BlogCategoryRequest request) {

        BlogCategory category = blogCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog category not found with id: " + id));

        if (!category.getSlug().equals(request.getSlug())
                && blogCategoryRepository.existsBySlug(request.getSlug())) {

            throw new IllegalArgumentException(
                    "Category with slug already exists: " + request.getSlug());
        }

        category.setName(request.getName());
        category.setSlug(request.getSlug());

        if (request.getActive() != null) {
            category.setActive(request.getActive());
        }

        BlogCategory updatedCategory = blogCategoryRepository.save(category);

        return mapToResponse(updatedCategory);
    }

    @Override
    public void deleteCategory(Long id) {

        BlogCategory category = blogCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog category not found with id: " + id));

        blogCategoryRepository.delete(category);
    }

    @Override
    public BlogCategoryResponse updateCategoryStatus(
            Long id,
            boolean active) {

        BlogCategory category = blogCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog category not found with id: " + id));

        category.setActive(active);

        BlogCategory updatedCategory = blogCategoryRepository.save(category);

        return mapToResponse(updatedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BlogCategoryResponse> getActiveCategories() {

        return blogCategoryRepository.findByActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public BlogCategoryResponse getCategoryBySlug(String slug) {

        BlogCategory category = blogCategoryRepository.findBySlugAndActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog category not found with slug: " + slug));

        return mapToResponse(category);
    }

    private BlogCategoryResponse mapToResponse(BlogCategory category) {

        BlogCategoryResponse response = new BlogCategoryResponse();

        response.setId(category.getId());
        response.setName(category.getName());
        response.setSlug(category.getSlug());
        response.setActive(category.isActive());
        response.setCreatedAt(category.getCreatedAt());
        response.setUpdatedAt(category.getUpdatedAt());

        return response;
    }
}