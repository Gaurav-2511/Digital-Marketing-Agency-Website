package com.digitalmarketing.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digitalmarketing.backend.entity.Portfolio;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long>{

    Optional<Portfolio> findBySlug(String slug);
    
    Optional<Portfolio> findByIdAndActiveTrue(Long id);

    Optional<Portfolio> findBySlugAndActiveTrue(String slug);

    List<Portfolio> findByActiveTrue();

    List<Portfolio> findByCategoryAndActiveTrue(String category);

    boolean existsBySlug(String slug);
    
    
}
