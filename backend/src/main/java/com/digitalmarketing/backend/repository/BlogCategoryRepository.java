package com.digitalmarketing.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitalmarketing.backend.entity.BlogCategory;

public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {

    Optional<BlogCategory> findBySlug(String slug);

    Optional<BlogCategory> findByIdAndActiveTrue(Long id);

    Optional<BlogCategory> findBySlugAndActiveTrue(String slug);

    List<BlogCategory> findByActiveTrue();

    boolean existsBySlug(String slug);
}