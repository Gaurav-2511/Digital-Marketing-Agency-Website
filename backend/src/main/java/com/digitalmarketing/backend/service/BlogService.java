package com.digitalmarketing.backend.service;

import java.util.List;

import com.digitalmarketing.backend.dto.request.BlogRequest;
import com.digitalmarketing.backend.dto.response.BlogResponse;

public interface BlogService {

	BlogResponse createBlog(BlogRequest request);

	List<BlogResponse> getAllBlogs();

	BlogResponse getBlogById(Long id);

	BlogResponse updateBlog(Long id, BlogRequest request);

	void deleteBlog(Long id);

	BlogResponse updateBlogStatus(Long id, boolean published);

	List<BlogResponse> getPublishedBlogs();

	BlogResponse getPublishedBlogById(Long id);

	BlogResponse getPublishedBlogBySlug(String slug);

	List<BlogResponse> getPublishedBlogsByCategory(Long categoryId);
}
