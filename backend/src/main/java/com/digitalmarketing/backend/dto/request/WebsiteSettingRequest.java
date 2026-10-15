package com.digitalmarketing.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WebsiteSettingRequest {

    @NotBlank(message = "Agency name is required")
    @Size(max = 150)
    private String agencyName;

    @Size(max = 300)
    private String tagline;

    @Size(max = 500)
    private String logoUrl;

    @Email(message = "Enter a valid contact email")
    @Size(max = 150)
    private String contactEmail;

    @Size(max = 30)
    private String phone;

    @Size(max = 500)
    private String address;

    @Size(max = 500)
    private String facebookUrl;

    @Size(max = 500)
    private String instagramUrl;

    @Size(max = 500)
    private String linkedinUrl;

    @Size(max = 500)
    private String youtubeUrl;

    @Size(max = 200)
    private String defaultMetaTitle;

    @Size(max = 500)
    private String defaultMetaDescription;

    @Size(max = 500)
    private String footerText;
}