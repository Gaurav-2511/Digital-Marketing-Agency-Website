package com.digitalmarketing.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digitalmarketing.backend.entity.CaseStudy;

@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {

    Optional<CaseStudy> findBySlug(String slug);

    Optional<CaseStudy> findByIdAndActiveTrue(Long id);

    Optional<CaseStudy> findBySlugAndActiveTrue(String slug);

    List<CaseStudy> findByActiveTrue();

    List<CaseStudy> findByIndustryAndActiveTrue(String industry);

    boolean existsBySlug(String slug);
}
