package com.digitalmarketing.backend.service.impl;

import com.digitalmarketing.backend.service.BlogService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.digitalmarketing.backend.dto.request.BlogRequest;
import com.digitalmarketing.backend.dto.response.BlogResponse;
import com.digitalmarketing.backend.entity.Blog;
import com.digitalmarketing.backend.entity.BlogCategory;
import com.digitalmarketing.backend.exception.ResourceNotFoundException;
import com.digitalmarketing.backend.repository.BlogCategoryRepository;
import com.digitalmarketing.backend.repository.BlogRepository;

@Service
@Transactional
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final BlogCategoryRepository blogCategoryRepository;

    public BlogServiceImpl(
            BlogRepository blogRepository,
            BlogCategoryRepository blogCategoryRepository) {

        this.blogRepository = blogRepository;
        this.blogCategoryRepository = blogCategoryRepository;
    }

    @Override
    public BlogResponse createBlog(BlogRequest request) {

        if (blogRepository.existsBySlug(request.getSlug())) {
            throw new IllegalArgumentException(
                    "Blog with slug '" + request.getSlug() + "' already exists");
        }

        BlogCategory category = blogCategoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog category not found with id: " + request.getCategoryId()));

        if (!category.isActive()) {
            throw new IllegalArgumentException(
                    "Cannot create blog with an inactive category");
        }

        Blog blog = new Blog();

        blog.setTitle(request.getTitle());
        blog.setSlug(request.getSlug());
        blog.setShortDescription(request.getShortDescription());
        blog.setContent(request.getContent());
        blog.setFeaturedImage(request.getFeaturedImage());
        blog.setAuthor(request.getAuthor());
        blog.setPublished(request.getPublished());
        blog.setCategory(category);

        Blog savedBlog = blogRepository.save(blog);

        return mapToResponse(savedBlog);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BlogResponse> getAllBlogs() {

        return blogRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BlogResponse getBlogById(Long id) {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog not found with id: " + id));

        return mapToResponse(blog);
    }

    @Override
    public BlogResponse updateBlog(Long id, BlogRequest request) {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog not found with id: " + id));

        if (!blog.getSlug().equals(request.getSlug())
                && blogRepository.existsBySlug(request.getSlug())) {

            throw new IllegalArgumentException(
                    "Blog with slug '" + request.getSlug() + "' already exists");
        }

        BlogCategory category = blogCategoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog category not found with id: " + request.getCategoryId()));

        if (!category.isActive()) {
            throw new IllegalArgumentException(
                    "Cannot assign an inactive category to a blog");
        }

        blog.setTitle(request.getTitle());
        blog.setSlug(request.getSlug());
        blog.setShortDescription(request.getShortDescription());
        blog.setContent(request.getContent());
        blog.setFeaturedImage(request.getFeaturedImage());
        blog.setAuthor(request.getAuthor());
        blog.setPublished(request.getPublished());
        blog.setCategory(category);

        Blog updatedBlog = blogRepository.save(blog);

        return mapToResponse(updatedBlog);
    }

    @Override
    public void deleteBlog(Long id) {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog not found with id: " + id));

        blogRepository.delete(blog);
    }

    @Override
    public BlogResponse updateBlogStatus(Long id, boolean published) {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Blog not found with id: " + id));

        blog.setPublished(published);

        Blog updatedBlog = blogRepository.save(blog);

        return mapToResponse(updatedBlog);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogResponse> getPublishedBlogs() {

        return blogRepository.findByPublishedTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BlogResponse getPublishedBlogById(Long id) {

        Blog blog = blogRepository.findByIdAndPublishedTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Published blog not found with id: " + id));

        return mapToResponse(blog);
    }

    @Override
    @Transactional(readOnly = true)
    public BlogResponse getPublishedBlogBySlug(String slug) {

        Blog blog = blogRepository.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Published blog not found with slug: " + slug));

        return mapToResponse(blog);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BlogResponse> getPublishedBlogsByCategory(Long categoryId) {

        return blogRepository.findByCategoryIdAndPublishedTrue(categoryId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private BlogResponse mapToResponse(Blog blog) {

        BlogResponse response = new BlogResponse();

        response.setId(blog.getId());
        response.setTitle(blog.getTitle());
        response.setSlug(blog.getSlug());
        response.setShortDescription(blog.getShortDescription());
        response.setContent(blog.getContent());
        response.setFeaturedImage(blog.getFeaturedImage());
        response.setAuthor(blog.getAuthor());
        response.setPublished(blog.isPublished());

        if (blog.getCategory() != null) {
            response.setCategoryId(blog.getCategory().getId());
            response.setCategoryName(blog.getCategory().getName());
            response.setCategorySlug(blog.getCategory().getSlug());
        }

        response.setCreatedAt(blog.getCreatedAt());
        response.setUpdatedAt(blog.getUpdatedAt());

        return response;
    }
}