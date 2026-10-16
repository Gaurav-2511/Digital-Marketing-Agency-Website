package com.digitalmarketing.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalmarketing.backend.dto.response.PublicWebsiteSettingResponse;
import com.digitalmarketing.backend.service.WebsiteSettingService;

@RestController
@RequestMapping("/api/public/settings")
public class PublicWebsiteSettingController {

    private final WebsiteSettingService websiteSettingService;

    public PublicWebsiteSettingController(
            WebsiteSettingService websiteSettingService) {
        this.websiteSettingService = websiteSettingService;
    }

    @GetMapping
    public ResponseEntity<PublicWebsiteSettingResponse> getPublicSettings() {

        PublicWebsiteSettingResponse response =
                PublicWebsiteSettingResponse.fromAdminResponse(
                        websiteSettingService.getSettings());

        return ResponseEntity.ok(response);
    }
}