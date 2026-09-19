package com.digitalmarketing.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "portfolio")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Portfolio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 150)
	private String title;

	@Column(nullable = false, unique = true, length = 180)
	private String slug;

	@Column(nullable = false, length = 300)
	private String shortDescription;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String description;

	@Column(length = 150)
	private String clientName;

	@Column(nullable = false, length = 100)
	private String category;

	@Column(length = 500)
	private String imageUrl;

	@Column(length = 500)
	private String projectUrl;

	@Column(nullable = false)
	private boolean active = true;

	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private LocalDateTime updatedAt;

	@PrePersist
	protected void onCreate() {

		LocalDateTime now = LocalDateTime.now();

		createdAt = now;
		updatedAt = now;
	}

	@PreUpdate
	protected void onUpdate() {

		updatedAt = LocalDateTime.now();
	}

}
