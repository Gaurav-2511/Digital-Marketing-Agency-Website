package com.digitalmarketing.backend.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.request.WebsiteSettingRequest;
import com.digitalmarketing.backend.dto.response.WebsiteSettingResponse;
import com.digitalmarketing.backend.service.WebsiteSettingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/settings")
public class AdminWebsiteSettingController {

	private final WebsiteSettingService settingsService;

	public AdminWebsiteSettingController(WebsiteSettingService settingsService) {
		this.settingsService = settingsService;
	}

	@GetMapping
	public ResponseEntity<WebsiteSettingResponse> getSettings() {
		return ResponseEntity.ok(settingsService.getSettings());
	}

	@PutMapping
	public ResponseEntity<WebsiteSettingResponse> updateSettings(@Valid @RequestBody WebsiteSettingRequest request) {

		return ResponseEntity.ok(settingsService.updateSettings(request));
	}
}