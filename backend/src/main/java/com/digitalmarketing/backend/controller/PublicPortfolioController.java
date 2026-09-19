package com.digitalmarketing.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.response.PortfolioResponse;
import com.digitalmarketing.backend.service.PortfolioService;

@RestController
@RequestMapping("/api/portfolio")
public class PublicPortfolioController {

	private final PortfolioService portfolioService;

	public PublicPortfolioController(PortfolioService portfolioService) {
		this.portfolioService = portfolioService;
	}

	@GetMapping
	public ResponseEntity<List<PortfolioResponse>> getActivePortfolios() {

		List<PortfolioResponse> response = portfolioService.getActivePortfolios();

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<PortfolioResponse> getPortfolioById(@PathVariable Long id) {

		PortfolioResponse response = portfolioService.getActivePortfolioById(id);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/slug/{slug}")
	public ResponseEntity<PortfolioResponse> getPortfolioBySlug(@PathVariable String slug) {

		PortfolioResponse response = portfolioService.getPortfolioBySlug(slug);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/category/{category}")
	public ResponseEntity<List<PortfolioResponse>> getPortfoliosByCategory(@PathVariable String category) {

		List<PortfolioResponse> response = portfolioService.getPortfoliosByCategory(category);

		return ResponseEntity.ok(response);
	} 

}
