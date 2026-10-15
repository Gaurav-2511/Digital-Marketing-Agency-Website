package com.digitalmarketing.backend.service;

import com.digitalmarketing.backend.dto.request.WebsiteSettingRequest;
import com.digitalmarketing.backend.dto.response.WebsiteSettingResponse;

public interface WebsiteSettingService {

	WebsiteSettingResponse getSettings();

	WebsiteSettingResponse updateSettings(WebsiteSettingRequest request);
}
