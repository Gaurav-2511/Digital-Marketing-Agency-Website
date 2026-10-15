package com.digitalmarketing.backend.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.digitalmarketing.backend.dto.request.WebsiteSettingRequest;
import com.digitalmarketing.backend.dto.response.WebsiteSettingResponse;
import com.digitalmarketing.backend.entity.WebsiteSetting;
import com.digitalmarketing.backend.repository.WebsiteSettingRepository;
import com.digitalmarketing.backend.service.WebsiteSettingService;

@Service
public class WebsiteSettingServiceImpl implements WebsiteSettingService {

	private final WebsiteSettingRepository repository;

	public WebsiteSettingServiceImpl(WebsiteSettingRepository repository) {
		this.repository = repository;
	}

	@Transactional(readOnly = true)
	public WebsiteSettingResponse getSettings() {
		return repository.findFirstByOrderByIdAsc().map(WebsiteSettingResponse::fromEntity).orElseGet(() -> {
			WebsiteSetting setting = new WebsiteSetting();
			return WebsiteSettingResponse.fromEntity(repository.save(setting));
		});
	}

	@Override
	public WebsiteSettingResponse updateSettings(WebsiteSettingRequest request) {

		WebsiteSetting setting = repository.findFirstByOrderByIdAsc().orElseGet(WebsiteSetting::new);

		setting.setAgencyName(request.getAgencyName().trim());
		setting.setTagline(request.getTagline());
		setting.setLogoUrl(request.getLogoUrl());
		setting.setContactEmail(request.getContactEmail());
		setting.setPhone(request.getPhone());
		setting.setAddress(request.getAddress());
		setting.setFacebookUrl(request.getFacebookUrl());
		setting.setInstagramUrl(request.getInstagramUrl());
		setting.setLinkedinUrl(request.getLinkedinUrl());
		setting.setYoutubeUrl(request.getYoutubeUrl());
		setting.setDefaultMetaTitle(request.getDefaultMetaTitle());
		setting.setDefaultMetaDescription(request.getDefaultMetaDescription());
		setting.setFooterText(request.getFooterText());

		WebsiteSetting saved = repository.save(setting);

		return WebsiteSettingResponse.fromEntity(saved);
	}
}