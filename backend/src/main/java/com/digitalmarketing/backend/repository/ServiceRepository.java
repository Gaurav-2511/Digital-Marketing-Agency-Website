package com.digitalmarketing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digitalmarketing.backend.entity.Service;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

	Optional<Service> findBySlug(String slug);
	
	Optional<Service> findBySlugAndActiveTrue(String slug);

	List<Service> findByActiveTrue();

	boolean existsBySlug(String slug);
}
