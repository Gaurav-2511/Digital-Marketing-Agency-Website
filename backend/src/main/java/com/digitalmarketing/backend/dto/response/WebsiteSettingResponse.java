package com.digitalmarketing.backend.dto.response;

import java.time.LocalDateTime;

import com.digitalmarketing.backend.entity.WebsiteSetting;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WebsiteSettingResponse {

    private Long id;
    private String agencyName;
    private String tagline;
    private String logoUrl;
    private String contactEmail;
    private String phone;
    private String address;
    private String facebookUrl;
    private String instagramUrl;
    private String linkedinUrl;
    private String youtubeUrl;
    private String defaultMetaTitle;
    private String defaultMetaDescription;
    private String footerText;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static WebsiteSettingResponse fromEntity(
            WebsiteSetting setting) {

        WebsiteSettingResponse response =
                new WebsiteSettingResponse();

        response.setId(setting.getId());
        response.setAgencyName(setting.getAgencyName());
        response.setTagline(setting.getTagline());
        response.setLogoUrl(setting.getLogoUrl());
        response.setContactEmail(setting.getContactEmail());
        response.setPhone(setting.getPhone());
        response.setAddress(setting.getAddress());
        response.setFacebookUrl(setting.getFacebookUrl());
        response.setInstagramUrl(setting.getInstagramUrl());
        response.setLinkedinUrl(setting.getLinkedinUrl());
        response.setYoutubeUrl(setting.getYoutubeUrl());
        response.setDefaultMetaTitle(setting.getDefaultMetaTitle());
        response.setDefaultMetaDescription(
                setting.getDefaultMetaDescription());
        response.setFooterText(setting.getFooterText());
        response.setCreatedAt(setting.getCreatedAt());
        response.setUpdatedAt(setting.getUpdatedAt());

        return response;
    }
}