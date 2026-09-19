package com.digitalmarketing.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.digitalmarketing.backend.dto.request.PortfolioRequest;
import com.digitalmarketing.backend.dto.response.PortfolioResponse;
import com.digitalmarketing.backend.service.PortfolioService;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/api/admin/portfolio")
public class PortfolioController {

	private final PortfolioService portfolioService;

	public PortfolioController(PortfolioService portfolioService) {
		this.portfolioService = portfolioService;
	}

	@PostMapping
	public ResponseEntity<PortfolioResponse> createPortfolio(@Valid @RequestBody PortfolioRequest request) {

		PortfolioResponse response = portfolioService.createPortfolio(request);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping
	public ResponseEntity<List<PortfolioResponse>> getAllPortfolios() {

		List<PortfolioResponse> response = portfolioService.getAllPortfolios();

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<PortfolioResponse> getPortfolioById(@PathVariable Long id) {

		PortfolioResponse response = portfolioService.getActivePortfolioById(id);

		return ResponseEntity.ok(response);
	}

	@PutMapping("/{id}")
	public ResponseEntity<PortfolioResponse> updatePortfolio(@PathVariable Long id,
			@Valid @RequestBody PortfolioRequest request) {

		PortfolioResponse response = portfolioService.updatePortfolio(id, request);

		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {

		portfolioService.deletePortfolio(id);

		return ResponseEntity.noContent().build();
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<PortfolioResponse> updatePortfolioStatus(@PathVariable Long id,
			@RequestParam boolean active) {

		PortfolioResponse response = portfolioService.updatePortfolioStatus(id, active);

		return ResponseEntity.ok(response);
	}
}
