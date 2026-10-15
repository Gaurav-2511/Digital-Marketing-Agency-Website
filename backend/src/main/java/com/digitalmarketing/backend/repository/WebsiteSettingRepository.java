package com.digitalmarketing.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitalmarketing.backend.entity.WebsiteSetting;

public interface WebsiteSettingRepository extends JpaRepository<WebsiteSetting, Long> {

    Optional<WebsiteSetting> findFirstByOrderByIdAsc();
}