package com.digitalmarketing.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digitalmarketing.backend.entity.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    Optional<Blog> findBySlug(String slug);

    Optional<Blog> findByIdAndPublishedTrue(Long id);

    Optional<Blog> findBySlugAndPublishedTrue(String slug);

    List<Blog> findByPublishedTrue();

    List<Blog> findByCategoryIdAndPublishedTrue(Long categoryId);

    boolean existsBySlug(String slug);
}