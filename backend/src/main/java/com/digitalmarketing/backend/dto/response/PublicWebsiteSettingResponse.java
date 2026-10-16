package com.digitalmarketing.backend.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PublicWebsiteSettingResponse {

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

    public static PublicWebsiteSettingResponse fromAdminResponse(
            WebsiteSettingResponse settings) {

        PublicWebsiteSettingResponse response =
                new PublicWebsiteSettingResponse();

        response.setAgencyName(settings.getAgencyName());
        response.setTagline(settings.getTagline());
        response.setLogoUrl(settings.getLogoUrl());
        response.setContactEmail(settings.getContactEmail());
        response.setPhone(settings.getPhone());
        response.setAddress(settings.getAddress());
        response.setFacebookUrl(settings.getFacebookUrl());
        response.setInstagramUrl(settings.getInstagramUrl());
        response.setLinkedinUrl(settings.getLinkedinUrl());
        response.setYoutubeUrl(settings.getYoutubeUrl());
        response.setDefaultMetaTitle(settings.getDefaultMetaTitle());
        response.setDefaultMetaDescription(
                settings.getDefaultMetaDescription());
        response.setFooterText(settings.getFooterText());

        return response;
    }
}